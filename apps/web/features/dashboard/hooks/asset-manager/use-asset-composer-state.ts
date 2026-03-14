import { useInfiniteQuery } from "@tanstack/react-query"
import { useReducer } from "react"
import type {
  AssetComposerActions,
  AssetComposerState,
} from "@/features/dashboard/components/pages/asset-manager/asset-compser-context"
import type { AssetFile, FileType } from "@/features/dashboard/types"
import { assetComposerReducer } from "@/features/dashboard/utils/asset-manager/asset-compser-reducer"
import { getInfiniteFilesOptions } from "@/features/dashboard/utils/asset-manager/asset-queries"

export function useAssetComposerState(fileType: FileType): {
  state: AssetComposerState
  actions: AssetComposerActions
} {
  const [state, dispatch] = useReducer(assetComposerReducer, {
    fileType,
    assetIds: [],
    searchQuery: "",
    sortBy: "newest",
    uploadProgress: [],
    canSelectFiles: false,
  })

  const { data, isPending, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage, isError } =
    useInfiniteQuery(
      getInfiniteFilesOptions({
        sortBy: state.sortBy,
        fileType: state.fileType,
        searchQuery: state.searchQuery,
      }),
    )

  return {
    state: {
      ...state,
      isError,
      isPending,
      isFetching,
      hasNextPage,
      isFetchingNextPage,
      filesCount: data?.count ?? 0,
      files: data?.files as AssetFile[],
    },
    actions: { dispatch, fetchNextPage },
  }
}
