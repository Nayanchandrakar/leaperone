import { useInfiniteQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import { getCategoryTypes } from "@/features/dashboard/utils/asset-manager"
import { getFiles } from "@/lib/api"

export function useInfiniteFiles() {
  const { fileCategory, sortOptions, query } = useAssetFilterStore(
    useShallow((state) => ({
      query: state.query,
      sortOptions: state.sortOptions,
      fileCategory: state.fileCategory,
    })),
  )

  const types = useMemo(() => getCategoryTypes(fileCategory), [fileCategory])

  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["files", fileCategory, sortOptions, query],
    queryFn: async ({ pageParam }) => {
      return await getFiles({
        query,
        types,
        pageSize: 40,
        page: pageParam,
        sortBy: sortOptions,
      })
    },
    select({ pages }) {
      const files = pages?.flatMap(({ data }) => data?.results)
      return {
        files,
        fileCategory,
        totalFiles: files?.length,
      }
    },
    getNextPageParam: ({ data }) => data?.nextPage,
  })
}
