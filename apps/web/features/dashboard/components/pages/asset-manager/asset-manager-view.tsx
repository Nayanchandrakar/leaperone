"use client"

import { useQuery } from "@tanstack/react-query"
import { getFiles } from "@/features/dashboard/actions/get-files"
import { EmptyAssetState } from "@/features/dashboard/components/pages/asset-manager/empty-asset-state"
import { ShowAssets } from "@/features/dashboard/components/pages/asset-manager/show-assets"

interface AssetManagerViewProps {
  workspaceId: string
}

export const AssetManagerView = ({ workspaceId }: AssetManagerViewProps) => {
  const { data } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      return await getFiles(workspaceId)
    },
  })

  if (data?.length! > 0) {
    return <ShowAssets data={data!} />
  }

  return <EmptyAssetState />
}
