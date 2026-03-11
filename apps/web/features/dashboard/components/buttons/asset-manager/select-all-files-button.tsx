import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import type { AssetFile, PickerMode } from "@/features/dashboard/types"

type SelectAllFilesButtonProps = {
  pickerMode: PickerMode
  data: {
    totalFiles: number
    files: AssetFile[]
  }
  isFetching: boolean
}

export function SelectAllFilesButton({ pickerMode, data, isFetching }: SelectAllFilesButtonProps) {
  const { selectedAssetIds, setSelectedAssetIds, isSelectionMode } = useAssetStore(
    useShallow((state) => ({
      isSelectionMode: state.isSelectionMode,
      selectedAssetIds: state.selectedAssetIds,
      setSelectedAssetIds: state.setSelectedAssetIds,
    })),
  )

  if (
    (isSelectionMode || pickerMode === "multiple") &&
    selectedAssetIds?.length < data?.totalFiles
  ) {
    return (
      <Button
        variant="gray-outline"
        disabled={Boolean(isFetching)}
        onClick={() => setSelectedAssetIds(data?.files?.map((f) => f?.id)!)}
      >
        Select All
      </Button>
    )
  }

  return null
}
