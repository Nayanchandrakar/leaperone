import { Skeleton } from "@app/ui/components/skeleton"

export const EditorLoadingSkeleton = () => {
  return Array.from({ length: 10 }).map((_, index) => (
    <div
      key={index}
      className="flex items-start gap-1.5 flex-col justify-between border border-gray-300 rounded-xl  p-5"
    >
      <Skeleton className="w-30 h-2.5" />
      <Skeleton className="h-2.5 w-60" />
    </div>
  ))
}
