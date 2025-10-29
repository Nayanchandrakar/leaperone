import { Skeleton } from "@app/ui/components/skeleton"
import { CircularProgress } from "../../../ui/circular-progress"

interface AssetCardSkeletonProps {
  progress?: number
}

export const AssetCardSkeleton = ({ progress }: AssetCardSkeletonProps) => (
  <div className="h-74 border rounded-xl flex flex-col">
    <Skeleton className="h-full rounded-t-xl rounded-b-none flex items-center justify-center">
      {!!progress && (
        <CircularProgress
          size={55}
          strokeWidth={6}
          progress={progress}
          className="stroke-primary/20"
          progressClassName="stroke-primary"
        />
      )}
    </Skeleton>
    <div className="w-full p-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-muted-foreground ">
        <Skeleton className="size-5" />
        <Skeleton className="h-5 w-34" />
      </div>
      <Skeleton className="size-5" />
    </div>
  </div>
)
