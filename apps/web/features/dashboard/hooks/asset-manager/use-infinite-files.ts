import { useInfiniteQuery } from "@tanstack/react-query"
import { useShallow } from "zustand/react/shallow"
import { getFiles } from "@/features/dashboard/actions/get-files"
import { FILE_CATEGORIES } from "@/features/dashboard/constants/asset-manager/filter-options"
import { useAssetFilterStore } from "./use-asset-file-store"

interface useInfiniteFileProps {
  workspaceId: string
}

export const useInfiniteFiles = ({ workspaceId }: useInfiniteFileProps) => {
  const { fileCategory, sortOptions, query } = useAssetFilterStore(
    useShallow((state) => ({
      query: state.query,
      sortOptions: state.sortOptions,
      fileCategory: state.fileCategory,
    })),
  )

  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["files", fileCategory, sortOptions, query],
    queryFn: async ({ pageParam }) => {
      return await getFiles(
        workspaceId,
        pageParam,
        40,
        FILE_CATEGORIES.find((f) => f.value === fileCategory)?.types! as string[],
        sortOptions,
        query,
      )
    },
    select({ pages }) {
      const files = pages?.flatMap((c) => c.results)
      return {
        files,
        fileCategory,
        totalFiles: files?.length,
      }
    },
    getNextPageParam: ({ nextPage }) => nextPage,
  })
}
