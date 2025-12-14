import { Skeleton } from "@app/ui/components/skeleton"

export const QrPreviewLoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-[280px]" />
    <Skeleton className="h-10 rounded-full" />
  </div>
)
