"use client"

import { useInfiniteQuery } from "@tanstack/react-query"
import { InfiniteScrollContainer } from "@/components/shared/infinite-scroll-container"
import { getFiles } from "@/features/dashboard/actions/get-files"
import { FileUploadProgress } from "@/features/dashboard/components/pages/asset-manager/file-upload-progress"
import { RenderFileCardSkeletons } from "@/features/dashboard/components/pages/asset-manager/render-file-card-skeletons"
import { RenderFiles } from "@/features/dashboard/components/pages/asset-manager/render-files"

const workspaceId = "zshbyvkstvevylexhxfyackg"

export const AssetManagerFiles = () => {
  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useInfiniteQuery({
      initialPageParam: 1,
      queryKey: ["files"],
      queryFn: async ({ pageParam }) => {
        return await getFiles(workspaceId, pageParam, 8)
      },
      getNextPageParam: ({ nextPage }) => nextPage,
    })

  const isContainerHidden = [!hasNextPage, isFetchingNextPage, isError].some(Boolean)
  const files = data?.pages.flatMap((p) => p.results)

  return (
    <InfiniteScrollContainer
      hidden={isContainerHidden}
      onIntersect={() => fetchNextPage()}
      className="mt-8 overflow-y-scroll no-scrollbar size-full max-h-screen p-3"
    >
      <div className="grid grid-cols-4 gap-6">
        <FileUploadProgress />
        {files?.length && !isPending && <RenderFiles data={files} />}
        {((hasNextPage && isFetchingNextPage) || isPending) && <RenderFileCardSkeletons />}
      </div>
    </InfiniteScrollContainer>
  )
}
