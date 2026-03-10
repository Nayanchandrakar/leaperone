"use client"

import { FILE_TYPES, MAX_FILE_SIZE, MAX_FILES } from "@app/core/constants"
import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useAssetUpload } from "@/features/dashboard/hooks/asset-manager/use-asset-upload"
import { useFileErrorNotify } from "@/features/dashboard/hooks/asset-manager/use-file-error-notify"
import { useFileUpload } from "@/features/dashboard/hooks/asset-manager/use-file-upload"

export function FileUploadButton() {
  /** Upload files to S3 Bucket */
  const onFilesAdded = useAssetUpload()

  /** File validation hook */
  const [{ errors }, { openFileDialog, getInputProps }] = useFileUpload({
    onFilesAdded,
    multiple: true,
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
    accept: FILE_TYPES.join(","),
  })

  /** Notify file error */
  useFileErrorNotify(errors)
  return (
    <Button variant="green-outline" className="w-full sm:w-fit" onClick={openFileDialog}>
      <PlusIcon />
      <span>New Upload</span>
      <input {...getInputProps()} hidden />
    </Button>
  )
}
