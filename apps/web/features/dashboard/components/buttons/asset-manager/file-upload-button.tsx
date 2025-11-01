"use client"

import { Button } from "@app/ui/components/button"
import { useQueryClient } from "@tanstack/react-query"
import axios, { type AxiosProgressEvent } from "axios"
import { PlusIcon } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import {
  type FileWithPreview,
  useFileUpload,
} from "@/features/dashboard/hooks/asset-manager/use-file-upload"
import { getPreSignedUrl } from "@/lib/api"

export const FileUploadButton = () => {
  const queryClient = useQueryClient()

  const { updateUploadProgress, updateUploadStatus, addUploadProgress } = useAssetStore(
    useShallow((state) => ({
      uploadProgressList: state.uploadProgressList,
      updateUploadStatus: state.updateUploadStatus,
      updateUploadProgress: state.updateUploadProgress,
      addUploadProgress: state.addUploadProgress,
    })),
  )

  function onUploadProgress(event: AxiosProgressEvent, fileId: string) {
    if (!event.total) return
    const progress = Math.round((event.loaded / event.total) * 100)
    updateUploadProgress(fileId, progress)
  }

  async function uploadFile(url: string, file: File, fileId: string) {
    try {
      const cancelSource = axios.CancelToken.source()
      addUploadProgress({ progress: 0, cancelToken: cancelSource, status: "uploading", fileId })

      return await axios.put(url, file, {
        cancelToken: cancelSource.token,
        onUploadProgress: (event) => onUploadProgress(event, fileId),
      })
    } catch {
      updateUploadStatus(fileId, "error")
      throw new Error(`Error uploading file ${file.name}`)
    }
  }

  async function onFilesAdded(selectedFiles: FileWithPreview[]) {
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

    for (const result of uploadResults) {
      if (result.status === "rejected" && result.reason instanceof Error) {
        toast.error(result.reason.message)
      }
    }

    setTimeout(() => {
      for (const result of uploadResults) {
        if (result.status === "fulfilled") {
          updateUploadStatus(result?.value, "uploaded")
        }
      }
      queryClient.invalidateQueries({ queryKey: ["files"] })
    }, 3000)
  }

  const [{ errors }, { openFileDialog, getInputProps }] = useFileUpload({
    onFilesAdded,
    maxFiles: 30,
    multiple: true,
    accept: "image/*",
    maxSize: 1 * 1024 * 1024,
  })

  useEffect(() => {
    if (!errors?.length) return
    const uniqueErrors = [...new Set(errors)]
    uniqueErrors.forEach((msg) => {
      toast.error(msg)
    })
  }, [errors])

  return (
    <Button variant="green-outline" className="w-full sm:w-fit" onClick={openFileDialog}>
      <PlusIcon />
      <span>New Upload</span>
      <input {...getInputProps()} hidden />
    </Button>
  )
}
