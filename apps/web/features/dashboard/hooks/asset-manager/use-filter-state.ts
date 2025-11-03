import { useInfiniteFiles } from "@/features/dashboard/hooks/asset-manager/use-infinite-files"

interface useFilterStateProps {
  workspaceId: string
}

export const useFilterState = ({ workspaceId }: useFilterStateProps) => {
  const { data, isFetching } = useInfiniteFiles({ workspaceId })

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
