"use client"
import { Skeleton } from "@app/ui/components/skeleton"
import { cn } from "@app/ui/lib/utils"
import { InfiniteScrollContainer } from "@/components/shared/infinite-scroll-container"
import { FileDropzone } from "@/features/dashboard/components/buttons/asset-manager/file-dropzone"
import { FileCard } from "@/features/dashboard/components/cards/asset-manager/file-card"
import { FileCardSkeleton } from "@/features/dashboard/components/skeletons/asset-manager/file-skeleton"
import { CircularProgress } from "@/features/dashboard/components/ui/circular-progress"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

export function AssetUploadProgressList() {
  const {
    state: { uploadProgress },
  } = useAssetComposer()

  const uploading = uploadProgress.filter((file) => file.status === "uploading")

  if (uploading.length === 0) return null

  return uploading.map(({ fileId, progress }) => (
    <div key={fileId} className="h-74 border rounded-xl flex flex-col">
      <Skeleton className="h-full rounded-t-xl rounded-b-none flex items-center justify-center">
        <CircularProgress
          size={55}
          strokeWidth={6}
          progress={progress}
          className="stroke-primary/20"
          progressClassName="stroke-primary"
        />
      </Skeleton>
      <div className="w-full p-4 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <Skeleton className="size-5" />
          <Skeleton className="h-5 w-30" />
        </div>
        <Skeleton className="size-5" />
      </div>
    </div>
  ))
}

export function AssetFilesContainer({
  children,
  className,
}: {
  className?: string
  children: React.ReactNode
}) {
  const {
    state: {
      isError,
      isPending,
      filesCount,
      hasNextPage,
      searchQuery,
      uploadProgress,
      isFetchingNextPage,
    },
    actions: { fetchNextPage },
  } = useAssetComposer()

  if (isError) {
    return (
      <div className="flex-center h-full">
        <p className="text-sm text-center text-muted-foreground">Something went wrong</p>
      </div>
    )
  }

  if (
    !isPending &&
    filesCount === 0 &&
    !uploadProgress.some(({ status }) => status === "uploading") &&
    !searchQuery
  ) {
    return <FileDropzone />
  }

  return (
    <InfiniteScrollContainer
      onIntersect={fetchNextPage}
      hidden={!hasNextPage && isFetchingNextPage}
      className={cn("mt-8 overflow-y-scroll no-scrollbar max-h-screen p-3", className)}
    >
      {children}
    </InfiniteScrollContainer>
  )
}

export function AssetFilesGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {children}
    </div>
  )
}

export function AssetFilesSkeleton() {
  const {
    state: { isPending, hasNextPage, isFetchingNextPage },
  } = useAssetComposer()

  return isPending || (hasNextPage && isFetchingNextPage) ? <FileCardSkeleton /> : null
}

export function AssetFilesList() {
  const {
    state: { files, assetIds },
  } = useAssetComposer()
  const assetIdsSet = new Set(assetIds)

  if (!Array.isArray(files) || files.length === 0) {
    return null
  }

  return files.map((file) => <FileCard file={file} key={file.id} assetIdsSet={assetIdsSet} />)
}
