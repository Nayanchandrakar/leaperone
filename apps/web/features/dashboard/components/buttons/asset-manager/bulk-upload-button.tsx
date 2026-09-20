import { Button } from "@app/ui/components/button"
import { UploadIcon } from "lucide-react"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

export function BulkUploadButton() {
  const {
    actions: { onUpload },
    state: { selectedAssets },
    meta: { uploadActionLabel },
  } = useAssetComposer()

  return (
    <Button
      disabled={selectedAssets.length === 0}
      onClick={() => onUpload(selectedAssets.map(({ url }) => url))}
    >
      <UploadIcon />
      {uploadActionLabel}
    </Button>
  )
}
