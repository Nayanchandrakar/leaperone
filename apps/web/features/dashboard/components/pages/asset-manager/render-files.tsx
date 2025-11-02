"use client"

import { useShallow } from "zustand/react/shallow"
import { InfiniteScrollContainer } from "@/components/shared/infinite-scroll-container"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import { useInfiniteFiles } from "@/features/dashboard/hooks/asset-manager/use-infinite-files"
import { FileCard } from "../../cards/asset-manager/file-card"
import { FileCardSkeleton } from "./file-card-skeleton"
import { UploadProgress } from "./upload-progress"

interface RenderFilesProps {
  workspaceId: string
}

export const RenderFiles = ({ workspaceId }: RenderFilesProps) => {
  const { fileCategory, sortOptions, query } = useAssetFilterStore(
    useShallow((state) => ({
      query: state.query,
      sortOptions: state.sortOptions,
      fileCategory: state.fileCategory,
    })),
  )

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useInfiniteFiles({
      query,
      workspaceId,
      sortOptions,
      fileCategory,
    })

  const isContainerHidden = [!hasNextPage, isFetchingNextPage, isError].some(Boolean)

  return (
    <InfiniteScrollContainer
      hidden={isContainerHidden}
      onIntersect={() => fetchNextPage()}
      className="mt-8 overflow-y-scroll no-scrollbar max-h-screen p-3"
    >
      <div className="grid grid-cols-4 gap-6">
        <UploadProgress />
        {data?.length! > 0 &&
          !isPending &&
          data?.map((file) => <FileCard key={`asset-files-${file.id}`} file={file} />)}
        {((hasNextPage && isFetchingNextPage) || isPending) && <FileCardSkeleton />}
      </div>
    </InfiniteScrollContainer>
  )
}
