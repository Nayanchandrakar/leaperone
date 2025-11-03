import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

interface UnSelectFilesButtonProps {
  isActionDisabled: boolean
}

export const UnSelectFilesButton = ({ isActionDisabled }: UnSelectFilesButtonProps) => {
  const { clearSelectedAssetIds, selectedAssetIds } = useAssetStore(
    useShallow((state) => ({
      selectedAssetIds: state.selectedAssetIds,
      clearSelectedAssetIds: state.clearSelectedAssetIds,
    })),
  )

  if (!selectedAssetIds?.length) return null

  return (
    <Button
      variant="gray-outline"
      disabled={isActionDisabled}
      onClick={() => clearSelectedAssetIds()}
    >
      Unselect
    </Button>
  )
}
