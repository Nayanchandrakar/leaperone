"use client"

import { cn } from "@app/ui/lib/utils"
import { useMemo } from "react"
import { InfiniteScrollContainer } from "@/components/shared/infinite-scroll-container"
import { FileDropzone } from "@/features/dashboard/components/buttons/asset-manager/file-dropzone"
import { FileCard } from "@/features/dashboard/components/cards/asset-manager/file-card"
import { UploadProgress } from "@/features/dashboard/components/pages/asset-manager/upload-progress"
import { FileCardSkeleton } from "@/features/dashboard/components/skeletons/asset-manager/file-skeleton"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { useRenderFiles } from "@/features/dashboard/hooks/asset-manager/user-render-files"
import type { PickerMode } from "@/features/dashboard/types"

function FileError() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-sm text-center text-muted-foreground">Something went wrong</p>
    </div>
  )
}

interface RenderFilesProps {
  pickerMode?: PickerMode
  className?: string
}

export function RenderFiles({ pickerMode = "none", className }: RenderFilesProps) {
  const selectedAssetIds = useAssetStore((state) => state.selectedAssetIds)
  const selectedIdsSet = useMemo(() => new Set(selectedAssetIds), [selectedAssetIds])

  const {
    data,
    isError,
    hasFiles,
    shouldShowContainer,
    handleFetchNextPage,
    shouldShowFileDropzone,
    shouldShowFileCardSkeleton,
  } = useRenderFiles()

  if (isError) {
    return <FileError />
  }

  if (shouldShowFileDropzone) {
    return <FileDropzone />
  }

  return (
    <InfiniteScrollContainer
      hidden={!shouldShowContainer}
      onIntersect={handleFetchNextPage}
      className={cn("mt-8 overflow-y-scroll no-scrollbar h-full p-3", className)}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UploadProgress />
        {hasFiles
          ? data?.files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                pickerMode={pickerMode}
                selectedIdsSet={selectedIdsSet}
              />
            ))
          : null}
        {shouldShowFileCardSkeleton ? <FileCardSkeleton /> : null}
      </div>
    </InfiniteScrollContainer>
  )
}
