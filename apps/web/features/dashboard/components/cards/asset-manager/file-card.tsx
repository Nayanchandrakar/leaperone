"use client"

import { Checkbox } from "@app/ui/components/checkbox"
import { cn } from "@app/ui/lib/utils"
import { Check, EllipsisVertical } from "lucide-react"
import Image from "next/image"
import { memo } from "react"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"
import { useFilePreviewStore } from "@/features/dashboard/hooks/asset-manager/use-file-preview-store"
import type { AssetFile } from "@/features/dashboard/types"
import { getAssetUrl, getIconForMime } from "@/features/dashboard/utils/asset-manager"

interface FileCardProps {
  file: AssetFile
  assetIdsSet: Set<string>
}

function Component({ file, assetIdsSet }: FileCardProps) {
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
    dispatch({ type: checked ? "add-asset-id" : "remove-asset-id", payload: file.id })
  }

  const Icon = getIconForMime(file.mime)
  const isSelected = asset?.id === file?.id
  return (
    <div
      onClick={handleClick}
      className={cn(
        "border h-74 rounded-xl relative bg-background transition-colors outline outline-transparent outline-offset-8 hover:outline-primary flex items-center flex-col",
        isSelected && "outline-primary",
      )}
    >
      {isSelected ? (
        <span className="absolute -top-3 -left-3 bg-primary rounded-full text-white size-4 flex-center">
          <Check className="size-3 stroke-3" />
        </span>
      ) : null}

      <Image
        width={1000}
        sizes="100vw"
        height={1000}
        alt={file?.name}
        src={getAssetUrl(file?.key)}
        className="size-full object-contain"
      />

      {canSelectFiles ? (
        <Checkbox
          onCheckedChange={handleCheck}
          className="absolute top-2 right-2"
          checked={assetIdsSet.has(file.id)}
        />
      ) : null}

      <div className="bg-muted rounded-b-xl w-full p-4 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Icon className="size-4 text-muted-foreground" />
          <p className="text-xs truncate max-w-32 font-normal text-muted-foreground">
            {file?.name}
          </p>
        </span>
        <EllipsisVertical className="size-4" />
      </div>
    </div>
  )
}

export const FileCard = memo(Component)
