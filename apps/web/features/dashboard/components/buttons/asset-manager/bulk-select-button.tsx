"use client"

import { Button } from "@app/ui/components/button"
import { getAssetUrl } from "@/features/dashboard/utils/asset-manager"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

export function AssetBulkSelectButton() {
  const {
    actions: { dispatch },
    state: { canSelectFiles, selectedAssets, files, filesCount, isFetching },
  } = useAssetComposer()

  if (canSelectFiles && selectedAssets.length < filesCount) {
    return (
      <Button
        disabled={isFetching}
        variant="gray-outline"
        onClick={() => {
          dispatch({
            type: "set-asset-ids",
            payload: files?.map(({ id, key }) => ({ id, url: getAssetUrl(key) })) ?? [],
          })
        }}
      >
        Select All
      </Button>
    )
  }

  return null
}
