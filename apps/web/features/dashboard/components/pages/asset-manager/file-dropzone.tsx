import { FILE_TYPES, MAX_FILE_SIZE, MAX_FILES } from "@app/core/constants"
import {
  AssetPromptAction,
  AssetPromptDescription,
  AssetPromptTitle,
} from "@/features/dashboard/components/ui/asset-prompt-action"
import { useAssetUpload } from "@/features/dashboard/hooks/asset-manager/use-asset-upload"
import { useFileErrorNotify } from "@/features/dashboard/hooks/asset-manager/use-file-error-notify"
import { useFileUpload } from "@/features/dashboard/hooks/asset-manager/use-file-upload"

export const FileDropzone = () => {
  /** Upload files to S3 Bucket */
  const onFilesAdded = useAssetUpload()

  /** File validation hook */
  const [
    { errors, isDragging },
    { openFileDialog, getInputProps, handleDragEnter, handleDragLeave, handleDrop, handleDragOver },
  ] = useFileUpload({
    onFilesAdded,
    multiple: true,
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
    accept: FILE_TYPES.join(","),
  })

  /** Notify file error */
  useFileErrorNotify(errors)

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
