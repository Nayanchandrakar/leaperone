"use client"

import React from "react"
import { useShallow } from "zustand/react/shallow"
import { InfiniteScrollContainer } from "@/components/shared/infinite-scroll-container"
import { RenderFileCardSkeletons } from "@/features/dashboard/components/pages/asset-manager/render-file-card-skeletons"
import { RenderFiles } from "@/features/dashboard/components/pages/asset-manager/render-files"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import { useInfiniteFiles } from "@/features/dashboard/hooks/asset-manager/use-infinite-files"
import { AssetManagerActions } from "./asset-manager-actions"
import { FileUploadProgress } from "./file-upload-progress"

interface AssetManagerFileProps {
  workspaceId: string
}

export const AssetManagerFiles = ({ workspaceId }: AssetManagerFileProps) => {
  const { fileCategory, sortOptions, query } = useAssetFilterStore(
    useShallow((state) => ({
      query: state.query,
      sortOptions: state.sortOptions,
      fileCategory: state.fileCategory,
    })),
  )

  const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage, isError } =
    useInfiniteFiles({
      workspaceId,
      fileCategory,
      query,
      sortOptions,
    })

  const isContainerHidden = [!hasNextPage, isFetchingNextPage, isError].some(Boolean)
  const files = data?.pages.flatMap((p) => p.results)

  return (
    <React.Fragment>
      <AssetManagerActions data={files!} />
      <InfiniteScrollContainer
        hidden={isContainerHidden}
        onIntersect={() => fetchNextPage()}
        className="mt-8 overflow-y-scroll no-scrollbar size-full max-h-screen p-3 scroll-smooth"
      >
        <div className="grid grid-cols-4 gap-6">
          <FileUploadProgress />
          {files?.length! > 0 && !isPending && <RenderFiles data={files!} />}
          {((hasNextPage && isFetchingNextPage) || isPending) && <RenderFileCardSkeletons />}
        </div>
      </InfiniteScrollContainer>
    </React.Fragment>
  )
}
