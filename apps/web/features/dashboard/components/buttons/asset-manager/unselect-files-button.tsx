"use client"

import { Button } from "@app/ui/components/button"
import { useCallback } from "react"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import type { PickerMode } from "@/features/dashboard/types"

interface UnSelectFilesButtonProps {
  pickerMode: PickerMode
  isActionDisabled: boolean
}

export function UnSelectFilesButton({ pickerMode, isActionDisabled }: UnSelectFilesButtonProps) {
  const { clearSelectedAssetIds, selectedAssetIds, toggleSelectionMode } = useAssetStore(
    useShallow((state) => ({
      selectedAssetIds: state.selectedAssetIds,
      toggleSelectionMode: state.toggleSelectionMode,
      clearSelectedAssetIds: state.clearSelectedAssetIds,
    })),
  )

  const handleClick = useCallback(() => {
    clearSelectedAssetIds()
    toggleSelectionMode(false)
  }, [clearSelectedAssetIds, toggleSelectionMode])

  if (!selectedAssetIds?.length || pickerMode === "single") {
    return null
  }

  return (
    <Button variant="gray-outline" disabled={isActionDisabled} onClick={handleClick}>
      Unselect
    </Button>
  )
}
