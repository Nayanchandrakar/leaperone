"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { useShallow } from "zustand/react/shallow"
import { InfiniteScrollContainer } from "@/components/shared/infinite-scroll-container"
import { getFiles } from "@/features/dashboard/actions/get-files"
import { FileUploadProgress } from "@/features/dashboard/components/pages/asset-manager/file-upload-progress"
import { RenderFileCardSkeletons } from "@/features/dashboard/components/pages/asset-manager/render-file-card-skeletons"
import { RenderFiles } from "@/features/dashboard/components/pages/asset-manager/render-files"
import { FILE_TYPE_OPTIONS } from "@/features/dashboard/constants/asset-manager/filter-options"
import { useFileStorage } from "@/features/dashboard/hooks/asset-manager/use-file-store"
import { AssetManagerActions } from "./asset-manager-actions"

interface AssetManagerFileProps {
  workspaceId: string
}

export const AssetManagerFiles = ({ workspaceId }: AssetManagerFileProps) => {
  const { fileType, sortBy, searchQuery } = useFileStorage(
    useShallow((state) => ({
      sortBy: state.sortBy,
      fileType: state.fileType,
      setSortBy: state.setSortBy,
      setFileType: state.setFileType,
      searchQuery: state.searchQuery,
    })),
  )

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["files", fileType, sortBy, searchQuery],
      queryFn: async ({ pageParam }) => {
        return await getFiles(
          workspaceId,
          pageParam,
          8,
          FILE_TYPE_OPTIONS.find((f) => f.value === fileType)?.types!,
          sortBy,
          searchQuery,
        )
      },
      getNextPageParam: ({ nextPage }) => nextPage,
    })

  const isContainerHidden = [!hasNextPage, isFetchingNextPage, isError].some(Boolean)
  const files = data?.pages.flatMap((p) => p.results)

  return (
    <>
      <AssetManagerActions data={files!} />
      <InfiniteScrollContainer
        hidden={isContainerHidden}
        onIntersect={() => fetchNextPage()}
        className="mt-8 overflow-y-scroll no-scrollbar size-full max-h-screen p-3"
      >
        <div className="grid grid-cols-4 gap-6">
          <FileUploadProgress />
          {files?.length! > 0 && !isPending && <RenderFiles data={files!} />}
          {((hasNextPage && isFetchingNextPage) || isPending) && <RenderFileCardSkeletons />}
        </div>
      </InfiniteScrollContainer>
    </>
  )
}
