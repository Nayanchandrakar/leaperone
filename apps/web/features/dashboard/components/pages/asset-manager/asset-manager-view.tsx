"use client"

import { useQuery } from "@tanstack/react-query"
import { useShallow } from "zustand/react/shallow"
import { getFiles } from "@/features/dashboard/actions/get-files"
import { useUploadStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { AssetManagerCard } from "../../cards/asset-manager/asset-card"
import { AssetCardSkeleton } from "../../cards/asset-manager/asset-card-skeleton"

interface AssetManagerViewProps {
  workspaceId: string
}

export const AssetManagerView = ({ workspaceId }: AssetManagerViewProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      return await getFiles(workspaceId)
    },
  })

  const { uploadProgress } = useUploadStore(
    useShallow((state) => ({
      updateStatus: state.updateStatus,
      uploadProgress: state.uploadProgress,
      updateProgress: state.updateProgress,
      setUploadProgress: state.setUploadProgress,
    })),
  )

  return (
    <div className="mt-8 overflow-y-scroll size-full max-h-screen p-3">
      <div className="grid grid-cols-4 gap-6">
        {uploadProgress
          .filter((p) => p.status === "uploading")
          .map(({ fileId, progress }) => (
            <AssetCardSkeleton key={fileId} progress={progress} />
          ))}

        {isLoading
          ? Array.from({ length: 40 }).map((_, index) => <AssetCardSkeleton key={index} />)
          : data?.map((file, index) => {
              return <AssetManagerCard key={index} file={file} />
            })}
      </div>
    </div>
  )
}
