import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

interface MultiFileSelectButtonProps {
  isDisabled: boolean
}

export const MultiFileSelectButton = ({ isDisabled }: MultiFileSelectButtonProps) => {
  const { toggleSelectionMode, isSelectionMode } = useAssetStore(
    useShallow((state) => ({
      isSelectionMode: state.isSelectionMode,
      toggleSelectionMode: state.toggleSelectionMode,
    })),
  )

  if (isSelectionMode) return null

  return (
    <Button variant="gray-outline" disabled={isDisabled} onClick={() => toggleSelectionMode(true)}>
      Select Multiple Files
    </Button>
  )
}
