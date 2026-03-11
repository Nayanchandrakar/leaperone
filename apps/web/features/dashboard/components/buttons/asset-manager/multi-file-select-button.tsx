import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import type { PickerMode } from "@/features/dashboard/types"

interface MultiFileSelectButtonProps {
  pickerMode: PickerMode
  isDisabled: boolean
}

export function MultiFileSelectButton({ pickerMode, isDisabled }: MultiFileSelectButtonProps) {
  const { toggleSelectionMode, isSelectionMode } = useAssetStore(
    useShallow((state) => ({
      isSelectionMode: state.isSelectionMode,
      toggleSelectionMode: state.toggleSelectionMode,
    })),
  )

  if (isSelectionMode || pickerMode !== "none") {
    return null
  }

  return (
    <Button variant="gray-outline" disabled={isDisabled} onClick={() => toggleSelectionMode(true)}>
      Select Multiple Files
    </Button>
  )
}
