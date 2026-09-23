import { Checkbox } from "@app/ui/components/checkbox"
import { cn } from "@app/ui/lib/utils"
import {
  FileCardCheckBadge,
  FileCardFooter,
  FileCardFrame,
  FileCardImage,
} from "@/features/dashboard/components/ui/file-card"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"
import { useFilePreviewStore } from "@/features/dashboard/hooks/asset-manager/use-file-preview-store"
import { getAssetUrl } from "@/features/dashboard/utils/asset-manager"
import type { AssetFile } from "@/features/dashboard/types"
import { getAssetUrl } from "@/features/dashboard/utils/asset-manager"

interface AssetDefaultCardProps {
  file: AssetFile
  assetIdsSet: Set<string>
}

// Default card variant
export function AssetDefaultCard({ file, assetIdsSet }: AssetDefaultCardProps) {
  const { setAsset, setIsOpen, asset } = useFilePreviewStore()

  const {
    state: { canSelectFiles },
    actions: { dispatch },
  } = useAssetComposer()

  const handleClick = () => {
    if (!canSelectFiles) {
      setAsset(file)
      setIsOpen(true)
    }
  }

  const handleCheck = (checked: boolean) => {
    if (!file?.id) return
    dispatch(
      checked
        ? { type: "add-asset-id", payload: { id: file.id, url: getAssetUrl(file.key) } }
        : { type: "remove-asset-id", payload: file.id },
    )
  }

  const isSelected = Boolean(asset?.id === file?.id)

  return (
    <FileCardFrame
      role="button"
      onClick={handleClick}
      className={cn("hover:outline-primary cursor-pointer", isSelected && "outline-primary")}
    >
      {isSelected && FileCardCheckBadge}
      <FileCardImage fileName={file?.name} imageSrc={file?.key} />

      {canSelectFiles ? (
        <Checkbox
          onCheckedChange={handleCheck}
          className="absolute top-2 right-2"
          checked={assetIdsSet.has(file?.id)}
        />
      ) : null}

      <FileCardFooter fileName={file?.name} fileMime={file?.mime} />
    </FileCardFrame>
  )
}

// Picker card variant
export function AssetPickerCard({ file, assetIdsSet }: AssetDefaultCardProps) {
  const {
    actions: { dispatch },
  } = useAssetComposer()

  const isSelected = assetIdsSet.has(file?.id)

  const handleClick = () => {
    dispatch({ type: "set-asset-ids", payload: [{ id: file.id, url: getAssetUrl(file.key) }] })
  }

  return (
    <FileCardFrame
      role="button"
      onClick={handleClick}
      className={cn("hover:outline-primary cursor-pointer", isSelected && "outline-primary")}
    >
      {isSelected && FileCardCheckBadge}
      <FileCardImage fileName={file?.name} imageSrc={file?.key} />
      <FileCardFooter fileName={file?.name} fileMime={file?.mime} />
    </FileCardFrame>
  )
}

// Checkbox card variant
export function AssetCheckboxCard({ file, assetIdsSet }: AssetDefaultCardProps) {
  const {
    actions: { dispatch },
  } = useAssetComposer()

  const handleCheck = (checked: boolean) => {
    if (!file?.id) return
    dispatch(
      checked
        ? { type: "add-asset-id", payload: { id: file.id, url: getAssetUrl(file.key) } }
        : { type: "remove-asset-id", payload: file.id },
    )
  }

  return (
    <FileCardFrame>
      <FileCardImage fileName={file?.name} imageSrc={file?.key} />
      <Checkbox
        onCheckedChange={handleCheck}
        className="absolute top-2 right-2"
        checked={assetIdsSet.has(file?.id)}
      />
      <FileCardFooter fileName={file?.name} fileMime={file?.mime} />
    </FileCardFrame>
  )
}
