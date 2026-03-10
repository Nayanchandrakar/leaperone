import { Checkbox } from "@app/ui/components/checkbox"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

type FileCardCheckboxProps = {
  fileId: string | undefined
  isSelectionMode: boolean
}

export function FileCheckbox({ fileId, isSelectionMode }: FileCardCheckboxProps) {
  const { addSelectedAssetId, removeSelectedAssetId, selectedAssetIds } = useAssetStore(
    useShallow((state) => ({
      selectedAssetIds: state.selectedAssetIds,
      addSelectedAssetId: state.addSelectedAssetId,
      removeSelectedAssetId: state.removeSelectedAssetId,
    })),
  )

  // Hide checkbox if not in selection mode
  if (!isSelectionMode) return null

  const handleCheck = (checked: boolean) => {
    if (!fileId) return

    if (checked) {
      addSelectedAssetId(fileId)
    } else {
      removeSelectedAssetId(fileId)
    }
  }

  const isSelected = selectedAssetIds?.includes(fileId!)

  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={handleCheck}
      className="absolute top-2 right-2"
    />
  )
}
