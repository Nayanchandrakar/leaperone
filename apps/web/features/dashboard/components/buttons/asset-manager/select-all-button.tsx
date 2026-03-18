"use client"

import { Button } from "@app/ui/components/button"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"
import { getAssetUrl } from "@/features/dashboard/utils/asset-manager"

export function AssetSelectAllButton() {
  const {
    actions: { dispatch },
    state: { selectedAssets, files, filesCount, isFetching },
  } = useAssetComposer()

  if (selectedAssets.length >= filesCount) return null

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
