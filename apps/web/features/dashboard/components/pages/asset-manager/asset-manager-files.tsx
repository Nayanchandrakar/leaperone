"use client"

import { useQuery } from "@tanstack/react-query"
import { getFiles } from "@/features/dashboard/actions/get-files"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { AssetManagerCard } from "../../cards/asset-manager/asset-card"
import { AssetCardSkeleton } from "../../cards/asset-manager/asset-card-skeleton"

const workspaceId = "zshbyvkstvevylexhxfyackg"

export const AssetManagerFiles = () => {
  const fileUploadProgress = useAssetStore((state) => state.fileUploadProgress)

  const { data, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: async () => await getFiles(workspaceId),
  })

  return (
    <div className="mt-8 overflow-y-scroll size-full max-h-screen p-3">
      <div className="grid grid-cols-4 gap-6">
        {fileUploadProgress
          .filter((p) => p.status === "uploading")
          .map(({ fileId, progress }) => (
            <AssetCardSkeleton key={fileId} progress={progress} />
          ))}

        {isLoading
          ? Array.from({ length: 50 }).map((_, index) => <AssetCardSkeleton key={index} />)
          : data?.map((file, index) => <AssetManagerCard key={index} file={file} />)}
      </div>
    </div>
  )
}
