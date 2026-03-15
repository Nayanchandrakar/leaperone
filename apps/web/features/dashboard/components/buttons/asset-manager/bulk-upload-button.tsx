import { Button } from "@app/ui/components/button"
import { UploadIcon } from "lucide-react"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

interface BulkUploadButtonProps {
  label: string
  onClick: (assets: string[]) => void
}

export function BulkUploadButton({ label, onClick }: BulkUploadButtonProps) {
  const {
    state: { assetIds },
  } = useAssetComposer()

  return (
    <Button disabled={assetIds.length === 0} onClick={() => onClick(assetIds)}>
      <UploadIcon />
      {label}
    </Button>
  )
}
