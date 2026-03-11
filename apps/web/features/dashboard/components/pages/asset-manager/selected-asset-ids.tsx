import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import type { PickerMode } from "@/features/dashboard/types"

interface SelectedAssetIdsProps {
  pickerMode: PickerMode
}

export function SelectedAssetIds({ pickerMode }: SelectedAssetIdsProps) {
  const selectedAssetIds = useAssetStore(useShallow((state) => state.selectedAssetIds))

  if (!selectedAssetIds?.length || pickerMode === "single") {
    return null
  }

  return (
    <span className="font-normal text-base text-primary">{selectedAssetIds.length} selected</span>
  )
}
