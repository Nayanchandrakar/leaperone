import { Button } from "@app/ui/components/button"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

type SelectAllFilesButtonProps = {
  data: {
    totalFiles: number
    files: any[]
  }
  isFetching: boolean
}

export function SelectAllFilesButton({ data, isFetching }: SelectAllFilesButtonProps) {
  const { selectedAssetIds, setSelectedAssetIds, isSelectionMode } = useAssetStore(
    useShallow((state) => ({
      isSelectionMode: state.isSelectionMode,
      selectedAssetIds: state.selectedAssetIds,
      setSelectedAssetIds: state.setSelectedAssetIds,
    })),
  )

  if (isSelectionMode && selectedAssetIds?.length < data?.totalFiles) {
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
