"use client"

import { Button } from "@app/ui/components/button"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

export function AssetBulkUnselectButton() {
  const {
    actions: { dispatch },
    state: { assetIds, isFetching },
  } = useAssetComposer()

  if (assetIds.length === 0) {
    return null
  }

  const handleClick = () => {
    dispatch({ type: "clear-asset-ids" })
    dispatch({ type: "set-can-select-files", payload: false })
  }

  return (
    <Button disabled={isFetching} variant="gray-outline" onClick={handleClick}>
      Unselect
    </Button>
  )
}
