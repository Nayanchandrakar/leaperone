"use client"

import { Button } from "@app/ui/components/button"
import axios from "axios"
import { PlusIcon } from "lucide-react"
import { useEffect } from "react"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import {
  type FileWithPreview,
  useFileUpload,
} from "@/features/dashboard/hooks/asset-manager/use-file-upload"
import { useUploadStore } from "@/features/dashboard/hooks/asset-manager/use-upload-store"
import { getPreSignedUrl } from "@/lib/api"

export const AssetUploadButton = () => {
  const { updateProgress, updateStatus, setUploadProgress } = useUploadStore(
    useShallow((state) => ({
      updateStatus: state.updateStatus,
      uploadProgress: state.uploadProgress,
      updateProgress: state.updateProgress,
      setUploadProgress: state.setUploadProgress,
    })),
  )

  const onFilesAdded = async (addedFiles: FileWithPreview[]) => {
    const batchUpload = addedFiles.map(async ({ file, id }) => {
      try {
        const presignedUrlResponse = await getPreSignedUrl({
          name: file?.name,
          size: file?.size,
          type: file?.type,
        })

        const { url } = presignedUrlResponse.data
        const source = axios.CancelToken.source()
        setUploadProgress({ progress: 0, cancelToken: source, status: "uploading", fileId: id })

        await axios.put(url, file, {
          onUploadProgress(event) {
            if (event.total) {
              const progress = Math.round((event.loaded / event.total) * 100)
              updateProgress(id, progress)
            }
          },
        })

        updateStatus(id, "uploaded")
      } catch (error) {
        console.error("somehitn", error)
      }
    })

    try {
      await Promise.all(batchUpload)
    } catch (error) {
      console.log("Failed to do something", error)
    }
  }

  const [{ errors }, { openFileDialog, getInputProps }] = useFileUpload({
    onFilesAdded,
    maxFiles: 30,
    multiple: true,
    accept: "image/*",
    maxSize: 10 * 1024 * 1024,
  })

  useEffect(() => {
    if (errors?.length > 0) {
      errors.forEach((msg) => {
        toast.error(msg)
      })
    }
  }, [errors])

  return (
    <Button type="button" variant="green-outline" onClick={openFileDialog}>
      <PlusIcon className="size-4" />
      <span>New Upload</span>
      <input {...getInputProps()} hidden />
    </Button>
  )
}
