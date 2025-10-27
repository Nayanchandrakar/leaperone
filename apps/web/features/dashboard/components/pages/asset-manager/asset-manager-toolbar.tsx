import { AssetUploadButton } from "@/features/dashboard/components/buttons/asset-manager/asset-upload-button"
import { AssetManagerSearchBar } from "@/features/dashboard/components/pages/asset-manager/asset-manager-search-bar"

export const AssetManagerToolbar = () => {
  return (
    <div className="mt-8 flex items-center justify-between gap-8">
      <AssetManagerSearchBar />
      <AssetUploadButton />
    </div>
  )
}
