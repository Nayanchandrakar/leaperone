import { useInfiniteFiles } from "@/features/dashboard/hooks/asset-manager/use-infinite-files"

export const useFilterState = () => {
  const { data, isFetching } = useInfiniteFiles()

  const isAllCategory = data?.fileCategory === "all"
  const totalFiles = data?.totalFiles ?? 0
  const hasFiles = totalFiles > 0

  const isFilterDisabled = isFetching || (isAllCategory && !hasFiles)
  const isActionDisabled = isFetching || !hasFiles

  return {
    data,
    isFetching,
    isFilterDisabled,
    isActionDisabled,
  }
}
