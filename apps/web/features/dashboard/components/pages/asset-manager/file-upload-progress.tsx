import { FileUploadProgressCard } from "@/features/dashboard/components/cards/asset-manager/file-progress-card"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

export const FileUploadProgress = () => {
  const uploads = useAssetStore((state) => state.fileUploadProgress)
  const uploadingFiles = uploads.filter((file) => file.status === "uploading")

  if (!uploadingFiles.length) return null

  return uploadingFiles.map(({ fileId, progress }) => (
    <FileUploadProgressCard key={fileId} progress={progress} />
  ))
}
