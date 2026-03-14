"use client"
import { Button } from "@app/ui/components/button"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

export function AssetBulkSelectButton() {
  const {
    actions: { dispatch },
    state: { canSelectFiles, assetIds, files, filesCount, isFetching },
  } = useAssetComposer()

  if (canSelectFiles && assetIds.length < filesCount) {
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

  return null
}
