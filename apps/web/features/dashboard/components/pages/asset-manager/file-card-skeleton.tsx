import { FileSkeleton } from "@/features/dashboard/components/skeletons/asset-manager/file-skeleton"

export const FileCardSkeleton = () => {
  return Array.from({ length: 50 }).map((_, index) => <FileSkeleton key={index} />)
}
