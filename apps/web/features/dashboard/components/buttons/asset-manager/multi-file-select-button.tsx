"use client"

import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

interface MultiFileSelectButtonProps {
  data: any[]
}

export const MultiFileSelectButton = ({ data }: MultiFileSelectButtonProps) => {
  const { toggleSelectionMode, isSelectionMode } = useAssetStore(
    useShallow((state) => ({
      isSelectionMode: state.isSelectionMode,
      toggleSelectionMode: state.toggleSelectionMode,
    })),
  )

  if (isSelectionMode || !data?.length) return null

  return (
    <Button variant="gray-outline" onClick={() => toggleSelectionMode(true)}>
      Select Multiple Files
    </Button>
  )
}
