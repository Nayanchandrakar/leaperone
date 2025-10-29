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

export const AssetUploadButton = () => {
  const queryClient = useQueryClient()

  const { updateUploadProgress, updateUploadStatus, setFileUploadProgress } = useAssetStore(
    useShallow((state) => ({
      fileUploadProgress: state.fileUploadProgress,
      updateUploadStatus: state.updateUploadStatus,
      updateUploadProgress: state.updateUploadProgress,
      setFileUploadProgress: state.setFileUploadProgress,
    })),
  )

  function onUploadProgress(event: AxiosProgressEvent, fileId: string) {
    if (!event.total) return
    const progress = Math.round((event.loaded / event.total) * 100)
    updateUploadProgress(fileId, progress)
  }

  async function uploadFile(file: File, fileId: string) {
    try {
      const { data } = await getPreSignedUrl({
        name: file.name,
        size: file.size,
        type: file.type,
      })
      const cancelSource = axios.CancelToken.source()
      setFileUploadProgress({ progress: 0, cancelToken: cancelSource, status: "uploading", fileId })

      await axios.put(data.url, file, {
        cancelToken: cancelSource.token,
        onUploadProgress: (event) => onUploadProgress(event, fileId),
      })
    } catch {
      updateUploadStatus(fileId, "error")
      throw new Error(`Error uploading file ${file.name}`)
    }
  }

  async function onFilesAdded(files: FileWithPreview[]) {
    const batchUploads = files.map(async ({ file, id }) => {
      await uploadFile(file as File, id)
      return id
    })

    const ids: Array<string> = []
    const response = await Promise.allSettled(batchUploads)

    for (const result of response) {
      if (result.status === "fulfilled") {
        ids.push(result.value)
      } else if (result.status === "rejected" && result.reason instanceof Error) {
        toast.error(result?.reason?.message)
      }
    }

    setTimeout(() => {
      ids.forEach((id) => {
        updateUploadStatus(id, "uploaded")
        queryClient.invalidateQueries({ queryKey: ["files"] })
      })
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
    const uniqueErrors = Array.from(new Set(errors))
    uniqueErrors.forEach((msg) => {
      toast.error(msg)
    })
  }, [errors])

  return (
    <Button type="button" variant="green-outline" onClick={openFileDialog}>
      <PlusIcon className="size-4" />
      <span>New Upload</span>
      <input {...getInputProps()} hidden />
    </Button>
  )
}
