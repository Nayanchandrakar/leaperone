"use client"

import { InfiniteScrollContainer } from "@/components/shared/infinite-scroll-container"
import { FileCard } from "@/features/dashboard/components/cards/asset-manager/file-card"
import { FileDropzone } from "@/features/dashboard/components/pages/asset-manager/file-dropzone"
import { FileError } from "@/features/dashboard/components/pages/asset-manager/file-error"
import { UploadProgress } from "@/features/dashboard/components/pages/asset-manager/upload-progress"
import { FileCardSkeleton } from "@/features/dashboard/components/skeletons/asset-manager/file-skeleton"
import { useRenderFiles } from "@/features/dashboard/hooks/asset-manager/user-render-files"

export function RenderFiles() {
  const {
    data,
    isError,
    hasFiles,
    shouldShowContainer,
    handleFetchNextPage,
    shouldShowFileDropzone,
    shouldShowFileCardSkeleton,
  } = useRenderFiles()

  if (isError) return <FileError />
  if (shouldShowFileDropzone) return <FileDropzone />

  return (
    <InfiniteScrollContainer
      hidden={!shouldShowContainer}
      onIntersect={handleFetchNextPage}
      className="mt-8 overflow-y-scroll no-scrollbar max-h-screen p-3"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <UploadProgress />
        {hasFiles && data?.files.map((file) => <FileCard key={file.id} file={file} />)}
        {shouldShowFileCardSkeleton && <FileCardSkeleton />}
      </div>
    </InfiniteScrollContainer>
  )
}
