import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

interface UnSelectFilesButtonProps {
  isActionDisabled: boolean
}

export function UnSelectFilesButton({ isActionDisabled }: UnSelectFilesButtonProps) {
  const { clearSelectedAssetIds, selectedAssetIds, toggleSelectionMode } = useAssetStore(
    useShallow((state) => ({
      toggleSelectionMode: state.toggleSelectionMode,
      selectedAssetIds: state.selectedAssetIds,
      clearSelectedAssetIds: state.clearSelectedAssetIds,
    })),
  )

  if (!selectedAssetIds?.length) return null

  const handleClick = () => {
    clearSelectedAssetIds()
    toggleSelectionMode(false)
  }

  return (
    <Button variant="gray-outline" disabled={isActionDisabled} onClick={handleClick}>
      Unselect
    </Button>
  )
}
