import { Skeleton } from "@app/ui/components/skeleton"

export const FileCardSkeleton = () => {
  return (
    <div className="h-74 border rounded-xl flex flex-col">
      <Skeleton className="h-full rounded-t-xl rounded-b-none" />
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-5 w-30" />
        </div>
        <Skeleton className="size-5" />
      </div>
    </div>
  )
}
