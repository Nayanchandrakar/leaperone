"use client"

import { FILE_TYPES, MAX_FILE_SIZE } from "@app/core/constants"
import { useEffect } from "react"
import { toast } from "sonner"
import {
  AssetPromptAction,
  AssetPromptDescription,
  AssetPromptTitle,
} from "@/features/dashboard/components/ui/asset-prompt-action"
import { useFileUpload } from "@/features/dashboard/hooks/asset-manager/use-file-upload"

export const EmptyAssetState = () => {
  const [
    { isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, getInputProps },
  ] = useFileUpload({
    maxFiles: 10,
    multiple: true,
    maxSize: MAX_FILE_SIZE,
    accept: FILE_TYPES.join(","),
  })

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((message) => {
        toast.error(message)
      })
    }
  }, [errors])

  return (
    <div className="flex items-center justify-center h-full">
      <AssetPromptAction
        onDrop={handleDrop}
        onClick={openFileDialog}
        data-dragging={isDragging}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
      >
        <input hidden {...getInputProps()} />
        <AssetPromptTitle>No files uploaded yet</AssetPromptTitle>
        <AssetPromptDescription>
          To upload, click on New Upload button or drop files/folders here
        </AssetPromptDescription>
      </AssetPromptAction>
    </div>
  )
}
