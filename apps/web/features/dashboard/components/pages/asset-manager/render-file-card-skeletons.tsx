import { FileCardSkeleton } from "@/features/dashboard/components/skeletons/asset-manager/file-card-skeleton"

export const RenderFileCardSkeletons = () => {
  return Array.from({ length: 50 }).map((_, index) => (
    <FileCardSkeleton key={`file-card-${index}`} />
  ))
}
