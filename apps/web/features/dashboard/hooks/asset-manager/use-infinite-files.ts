import { useInfiniteQuery } from "@tanstack/react-query"
import { getFiles } from "@/features/dashboard/actions/get-files"
import { FILE_CATEGORIES } from "@/features/dashboard/constants/asset-manager/filter-options"
import type { FileCategory, SortOptions } from "@/features/dashboard/types"

interface useInfiniteFileProps {
  query: string
  workspaceId: string
  fileCategory: FileCategory
  sortOptions: SortOptions
}

export const useInfiniteFiles = ({
  fileCategory,
  query,
  sortOptions,
  workspaceId,
}: useInfiniteFileProps) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["files", fileCategory, sortOptions, query],
    queryFn: async ({ pageParam }) => {
      return await getFiles(
        workspaceId,
        pageParam,
        8,
        FILE_CATEGORIES.find((f) => f.value === fileCategory)?.types! as string[],
        sortOptions,
        query,
      )
    },
    getNextPageParam: ({ nextPage }) => nextPage,
    select(data) {
      return data?.pages?.flatMap((p) => p.results)
    },
  })
}
