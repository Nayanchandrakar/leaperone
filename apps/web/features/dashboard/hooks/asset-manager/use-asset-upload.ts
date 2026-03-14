import { useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import type { FileWithPreview } from "@/features/dashboard/hooks/asset-manager/use-file-upload"
import type { FileStatus, UploadProgress } from "@/features/dashboard/types"
import { generatePreSignedUrl } from "@/lib/api"

export interface AssetUploadCallbacks {
  addUploadProgress: (progress: UploadProgress) => void
  updateUploadProgress: (fileId: string, progress: number) => void
  updateUploadStatus: (fileId: string, status: FileStatus) => void
}

export function useAssetUpload({
  addUploadProgress,
  updateUploadProgress,
  updateUploadStatus,
}: AssetUploadCallbacks) {
  const queryClient = useQueryClient()

  async function uploadFile(url: string, file: File, fileId: string) {
    const cancelToken = axios.CancelToken.source()
    addUploadProgress({
      fileId,
      cancelToken,
      progress: 0,
      status: "uploading",
    })

    try {
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
  }

  async function onFilesAdded(selectedFiles: FileWithPreview[]) {
    const payload = selectedFiles.map(({ file, id }) => ({
      id,
      name: file.name,
      type: file.type,
      size: file.size,
    }))

    const preSignedResponse = toast.promise(generatePreSignedUrl(payload), {
      loading: "Processing your files",
      error: "Your upload request failed",
    })

    const result = await preSignedResponse.unwrap()
    const { data } = result.data

    const urlMap = new Map(data.map(({ id, url }) => [id, url]))
    const files = selectedFiles.filter(({ id }) => urlMap.has(id))

    if (files.length === 0) return

    const completedIds: string[] = []
    const uploadResults = await Promise.allSettled(
      files.map(async ({ file, id }) => {
        const preSignedUrl = urlMap.get(id)!
        await uploadFile(preSignedUrl, file as File, id)
        return id
      }),
    )

    for (const uploadResult of uploadResults) {
      if (uploadResult.status === "fulfilled") {
        completedIds.push(uploadResult.value)
      } else if (uploadResult.status === "rejected" && uploadResult.reason instanceof Error) {
        toast.error(uploadResult.reason.message)
      }
    }

    setTimeout(() => {
      for (const id of completedIds) {
        updateUploadStatus(id, "uploaded")
      }
      queryClient.invalidateQueries({ queryKey: ["files"] })
    }, 5000)
  }

  return { onFilesAdded }
}
