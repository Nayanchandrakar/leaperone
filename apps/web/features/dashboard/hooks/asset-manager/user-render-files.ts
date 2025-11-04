import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { useInfiniteFiles } from "@/features/dashboard/hooks/asset-manager/use-infinite-files"

export const useRenderFiles = () => {
  const searchQuery = useAssetFilterStore(useShallow((state) => state.query))
  const hasActiveUploads = useAssetStore(useShallow((state) => state.hasActiveUploads()))

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useInfiniteFiles()

  const filesCount = data?.totalFiles ?? 0
  const hasFiles = filesCount > 0

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const shouldShowContainer = hasNextPage || !isFetchingNextPage
  const shouldShowFileDropzone = !isPending && !hasFiles && !hasActiveUploads && !searchQuery
  const shouldShowFileCardSkeleton = isPending || (hasNextPage && isFetchingNextPage)

  return {
    data,
    isError,
    hasFiles,
    filesCount,
    fetchNextPage,
    hasActiveUploads,
    shouldShowContainer,
    handleFetchNextPage,
    shouldShowFileDropzone,
    shouldShowFileCardSkeleton,
  }
}
