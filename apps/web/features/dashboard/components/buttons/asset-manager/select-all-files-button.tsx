"use client"

import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

type SelectAllFilesButtonProps = {
  data: any[]
}

export const SelectAllFilesButton = ({ data }: SelectAllFilesButtonProps) => {
  const { selectedAssetIds, setSelectedAssetIds, isSelectionMode } = useAssetStore(
    useShallow((state) => ({
      isSelectionMode: state.isSelectionMode,
      selectedAssetIds: state.selectedAssetIds,
      setSelectedAssetIds: state.setSelectedAssetIds,
    })),
  )

  if (isSelectionMode && selectedAssetIds?.length < data?.length) {
    return (
      <Button variant="gray-outline" onClick={() => setSelectedAssetIds(data?.map((f) => f?.id)!)}>
        Select All
      </Button>
    )
  }

  return null
}
