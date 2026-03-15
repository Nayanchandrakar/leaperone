"use client"

import { Button } from "@app/ui/components/button"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

export function AssetSelectAllButton() {
  const {
    actions: { dispatch },
    state: { assetIds, files, filesCount, isFetching },
  } = useAssetComposer()

  if (assetIds.length >= filesCount) return null

  return (
    <Button
      disabled={isFetching}
      variant="gray-outline"
      onClick={() => {
        dispatch({ type: "set-asset-ids", payload: files?.map(({ id }) => id) ?? [] })
      }}
    >
      Select All
    </Button>
  )
}
