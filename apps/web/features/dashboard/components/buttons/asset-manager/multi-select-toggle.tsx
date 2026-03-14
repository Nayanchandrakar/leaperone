"use client"
import { Button } from "@app/ui/components/button"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"
import { isAssetFilterDisabled } from "@/features/dashboard/utils/asset-manager"

export function AssetMultiSelectToggle() {
  const {
    actions: { dispatch },
    state: { fileType, isFetching, filesCount, canSelectFiles },
  } = useAssetComposer()

  if (canSelectFiles) return null

  return (
    <Button
      variant="gray-outline"
      disabled={isAssetFilterDisabled(fileType, isFetching, filesCount)}
      onClick={() => dispatch({ type: "set-can-select-files", payload: true })}
    >
      Select Multiple Files
    </Button>
  )
}
