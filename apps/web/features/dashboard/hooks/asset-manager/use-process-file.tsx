import { useQueryClient } from "@tanstack/react-query"
import axios, { type AxiosProgressEvent } from "axios"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import {
  type FileWithPreview,
  useFileUpload,
} from "@/features/dashboard/hooks/asset-manager/use-file-upload"
import { getPreSignedUrl } from "@/lib/api"

interface UseAssetUploadOptions {
  maxFiles?: number
  multiple?: boolean
  accept?: string
  maxSize?: number
  onUploadComplete?: () => void
  invalidateQueryKey?: string[]
}

export const useAssetUpload = (options: UseAssetUploadOptions = {}) => {
  const {
    maxFiles = 30,
    multiple = true,
    accept = "image/*",
    maxSize = 1 * 1024 * 1024,
    onUploadComplete,
    invalidateQueryKey = ["files"],
  } = options

  const queryClient = useQueryClient()

  const { updateUploadProgress, updateUploadStatus, addUploadProgress } = useAssetStore(
    useShallow((state) => ({
      addUploadProgress: state.addUploadProgress,
      uploadProgressList: state.uploadProgressList,
      updateUploadStatus: state.updateUploadStatus,
      updateUploadProgress: state.updateUploadProgress,
    })),
  )

  const handleUploadProgress = useCallback(
    (event: AxiosProgressEvent, fileId: string) => {
      if (!event.total) return
      const progress = Math.round((event.loaded / event.total) * 100)
      updateUploadProgress(fileId, progress)
    },
    [updateUploadProgress],
  )

  const uploadFile = useCallback(
    async (url: string, file: File, fileId: string) => {
      try {
        const cancelSource = axios.CancelToken.source()
        addUploadProgress({
          progress: 0,
          cancelToken: cancelSource,
          status: "uploading",
          fileId,
        })

        return await axios.put(url, file, {
          cancelToken: cancelSource.token,
          onUploadProgress: (event) => handleUploadProgress(event, fileId),
        })
      } catch {
        updateUploadStatus(fileId, "error")
        throw new Error(`Error uploading file ${file.name}`)
      }
    },
    [addUploadProgress, handleUploadProgress, updateUploadStatus],
  )

  const processUpload = useCallback(
    async (selectedFiles: FileWithPreview[]) => {
      const uploadRequests = selectedFiles.map(({ file, id }) => ({
        fileId: id,
        name: file.name,
        type: file.type,
        size: file.size,
      }))

      const preSignedResponse = toast.promise(getPreSignedUrl(uploadRequests), {
        loading: "Processing your files",
        error: "Your upload request failed",
      })

      const preSignedResult = await preSignedResponse.unwrap()
      const { data: preSignedUrls } = preSignedResult.data

      const urlMap = new Map(preSignedUrls.map((url) => [url.fileId, url.url]))
      const filesToUpload = selectedFiles.filter(({ id }) => urlMap?.has(id))

      if (filesToUpload?.length === 0) return

      const uploadResults = await Promise.allSettled(
        filesToUpload.map(async ({ file, id }) => {
          const preSignedUrl = urlMap.get(id)!
          await uploadFile(preSignedUrl, file as File, id)
          return id
        }),
      )

      // Handle rejected uploads
      for (const result of uploadResults) {
        if (result.status === "rejected" && result.reason instanceof Error) {
          toast.error(result.reason.message)
        }
      }

      // Update status and invalidate queries after delay
      setTimeout(() => {
        for (const result of uploadResults) {
          if (result.status === "fulfilled") {
            updateUploadStatus(result?.value, "uploaded")
          }
        }
        queryClient.invalidateQueries({ queryKey: invalidateQueryKey })
        onUploadComplete?.()
      }, 3000)
    },
    [uploadFile, updateUploadStatus, queryClient, invalidateQueryKey, onUploadComplete],
  )

  const [{ errors }, { openFileDialog, getInputProps }] = useFileUpload({
    onFilesAdded: processUpload,
    maxFiles,
    multiple,
    accept,
    maxSize,
  })

  // Handle validation errors
  useEffect(() => {
    if (!errors?.length) return

    const uniqueErrors = [...new Set(errors)]
    uniqueErrors.forEach((msg) => {
      toast.error(msg)
    })
  }, [errors])

  return {
    openFileDialog,
    getInputProps,
  }
}
