import { EmptyAssetState } from "@/features/dashboard/components/pages/asset-manager/empty-asset-state"
import { ShowAssets } from "@/features/dashboard/components/pages/asset-manager/show-assets"

export const AssetManagerView = () => {
  const data = Array.from({ length: 0 })

  if (data.length > 0) {
    return <ShowAssets data={data} />
  }

  return <EmptyAssetState />
}
