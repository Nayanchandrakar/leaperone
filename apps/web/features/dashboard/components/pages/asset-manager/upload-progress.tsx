import { FileUploadProgressCard } from "@/features/dashboard/components/cards/asset-manager/file-progress-card"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

export const UploadProgress = () => {
  const uploadProgressList = useAssetStore((state) => state.uploadProgressList)
  const uploading = uploadProgressList.filter((file) => file.status === "uploading")

  if (uploading?.length > 0) {
    return uploading.map(({ fileId, progress }) => (
      <FileUploadProgressCard key={fileId} progress={progress} />
    ))
  }

  return null
}
