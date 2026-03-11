import { Skeleton } from "@app/ui/components/skeleton"
import { CircularProgress } from "@/features/dashboard/components/ui/circular-progress"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

function FileUploadProgressCard({ progress }: { progress: number }) {
  return (
    <div className="h-74 border rounded-xl flex flex-col">
      <Skeleton className="h-full rounded-t-xl rounded-b-none flex items-center justify-center">
        <CircularProgress
          size={55}
          strokeWidth={6}
          progress={progress}
          className="stroke-primary/20"
          progressClassName="stroke-primary"
        />
      </Skeleton>
      <div className="w-full p-4 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-5 w-30" />
        </div>
        <Skeleton className="size-5" />
      </div>
    </div>
  )
}

export function UploadProgress() {
  const uploadProgressList = useAssetStore((state) => state.uploadProgressList)
  const uploading = uploadProgressList.filter((file) => file.status === "uploading")

  if (uploading?.length > 0) {
    return uploading.map(({ fileId, progress }) => (
      <FileUploadProgressCard key={fileId} progress={progress} />
    ))
  }

  return null
}
