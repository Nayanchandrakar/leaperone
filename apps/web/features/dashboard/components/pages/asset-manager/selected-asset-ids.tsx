import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

export const SelectedAssetIds = () => {
  const selectedAssetIds = useAssetStore((state) => state.selectedAssetIds)
  if (!selectedAssetIds?.length) return null

  return (
    <span className="font-normal text-base text-primary">{selectedAssetIds?.length} selected</span>
  )
}
