import { infiniteQueryOptions } from "@tanstack/react-query"
import { FILE_TYPES } from "@/features/dashboard/constants/asset-manager/filter-options"
import type { FileType, SortBy } from "@/features/dashboard/types"
import { getFiles } from "@/lib/api"

type InfiniteFilesOptionsParams = {
  sortBy: SortBy
  fileType: FileType
  pageSize?: number
  searchQuery?: string
}

export function getInfiniteFilesOptions({
  sortBy,
  fileType,
  searchQuery,
  pageSize = 40,
}: InfiniteFilesOptionsParams) {
  return infiniteQueryOptions({
    initialPageParam: 1,
    queryKey: ["files", fileType, sortBy, searchQuery, pageSize],
    queryFn: async ({ pageParam }) => {
      const types = (FILE_TYPES.find((t) => t.value === fileType)?.types ?? []) as string[]

      const { data } = await getFiles({
        types,
        sortBy,
        pageSize,
        page: pageParam,
        query: searchQuery,
      })

      return data
    },
    select: ({ pages }) => {
      const files = pages ? pages.flatMap((p) => p.results) : []
      return { files, count: files.length }
    },
    getNextPageParam: ({ nextPage }) => nextPage,
  })
}
