import { Skeleton } from "@app/ui/components/skeleton"

export function MemberItemSkeleton() {
  return Array.from({ length: 6 }).map((_, index) => (
    <div key={index} className="border rounded-lg p-4 sm:p-5 xl:p-6 space-y-4">
      <div className="flex items-center gap-3.5">
        <Skeleton className="size-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4.5 max-w-32" />
          <Skeleton className="h-4 max-w-24" />
        </div>
      </div>
      <Skeleton className="h-9 w-full rounded-full" />
    </div>
  ))
}
