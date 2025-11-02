import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useCallback } from "react"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import type { FileWithPreview } from "@/features/dashboard/hooks/asset-manager/use-file-upload"
import { generatePreSignedUrl } from "@/lib/api"

export const useAssetUpload = () => {
  const queryClient = useQueryClient()

  const { updateUploadProgress, updateUploadStatus, addUploadProgress } = useAssetStore(
    useShallow((state) => ({
      addUploadProgress: state.addUploadProgress,
      uploadProgressList: state.uploadProgressList,
      updateUploadStatus: state.updateUploadStatus,
      updateUploadProgress: state.updateUploadProgress,
    })),
  )

  const uploadFile = useCallback(
    async (url: string, file: File, fileId: string) => {
      try {
        const cancelToken = axios.CancelToken.source()
        addUploadProgress({
          fileId,
          cancelToken,
          progress: 0,
          status: "uploading",
        })

        await axios.put(url, file, {
          cancelToken: cancelToken.token,
          onUploadProgress: (event) => {
            if (event?.total) {
              const progress = Math.round((event.loaded / event.total) * 100)
              updateUploadProgress(fileId, progress)
            }
          },
        })
      } catch {
        updateUploadStatus(fileId, "error")
        throw new Error(`Error uploading file ${file.name}`)
      }
    },
    [addUploadProgress, updateUploadStatus, updateUploadProgress],
  )

  const onFilesAdded = useCallback(
    async (selectedFiles: FileWithPreview[]) => {
      const payload = selectedFiles.map(({ file, id }) => ({
        id,
        name: file.name,
        type: file.type,
        size: file.size,
      }))

      const response = toast.promise(generatePreSignedUrl(payload), {
        loading: "Processing your files",
        error: "Your upload request failed",
      })

      const result = await response.unwrap()
      const { data } = result.data

      const urlMap = new Map(data.map(({ id, url }) => [id, url]))
      const files = selectedFiles.filter(({ id }) => urlMap.has(id))

      if (files?.length) {
        const ids: string[] = []
        const response = await Promise.allSettled(
          files.map(async ({ file, id }) => {
            const preSignedUrl = urlMap.get(id)!
            await uploadFile(preSignedUrl, file as File, id)
            return id
          }),
        )

        for (const result of response) {
          if (result.status === "fulfilled") {
            ids.push(result.value)
          } else if (result.status === "rejected" && result.reason instanceof Error) {
            toast.error(result.reason.message)
          }
        }

        setTimeout(() => {
          for (const id of ids) updateUploadStatus(id, "uploaded")
          queryClient.invalidateQueries({ queryKey: ["files"] })
        }, 3000)
      }
    },
    [uploadFile, updateUploadStatus, queryClient],
  )

  return onFilesAdded
}
