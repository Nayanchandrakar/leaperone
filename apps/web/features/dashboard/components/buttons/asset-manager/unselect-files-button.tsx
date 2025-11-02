"use client"

import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

export const UnSelectFilesButton = () => {
  const { clearSelectedAssetIds, selectedAssetIds } = useAssetStore(
    useShallow((state) => ({
      selectedAssetIds: state.selectedAssetIds,
      clearSelectedAssetIds: state.clearSelectedAssetIds,
    })),
  )

  if (!selectedAssetIds?.length) return null

  return (
    <Button variant="gray-outline" onClick={() => clearSelectedAssetIds()}>
      Unselect
    </Button>
  )
}
