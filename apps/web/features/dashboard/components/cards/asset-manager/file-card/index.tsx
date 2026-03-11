"use client"

import { Checkbox } from "@app/ui/components/checkbox"
import { cn } from "@app/ui/lib/utils"
import { Check, EllipsisVertical } from "lucide-react"
import Image from "next/image"
import { memo } from "react"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { useFilePreviewStore } from "@/features/dashboard/hooks/asset-manager/use-file-preview-store"
import type { AssetFile, PickerMode } from "@/features/dashboard/types"
import { getAssetUrl, getIconForMime } from "@/features/dashboard/utils/asset-manager"

interface FileCardProps {
  file: AssetFile
  pickerMode: PickerMode
  selectedIdsSet: Set<string>
}

function FileCardInner({ file, pickerMode, selectedIdsSet }: FileCardProps) {
  const { setAsset, setIsOpen, asset } = useFilePreviewStore()
  const { isSelectionMode, addSelectedAssetId, removeSelectedAssetId, setSelectedAssetIds } =
    useAssetStore(
      useShallow((state) => ({
        isSelectionMode: state.isSelectionMode,
        addSelectedAssetId: state.addSelectedAssetId,
        setSelectedAssetIds: state.setSelectedAssetIds,
        removeSelectedAssetId: state.removeSelectedAssetId,
      })),
    )

  const handleClick = () => {
    if (pickerMode === "single") {
      setSelectedAssetIds([file.id])
      return
    }

    if (pickerMode === "multiple") {
      if (selectedIdsSet.has(file.id)) {
        removeSelectedAssetId(file.id)
      } else {
        addSelectedAssetId(file.id)
      }
      return
    }

    if (!isSelectionMode) {
      setAsset(file)
      setIsOpen(true)
    }
  }

  const handleCheck = (checked: boolean) => {
    if (!file?.id) return

    if (checked) {
      addSelectedAssetId(file.id)
    } else {
      removeSelectedAssetId(file.id)
    }
  }

  const isSelected = pickerMode !== "none" ? selectedIdsSet.has(file.id) : asset?.id === file?.id
  const showCheckbox = isSelectionMode || pickerMode === "multiple"
  const Icon = getIconForMime(file.mime)

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

      {showCheckbox ? (
        <Checkbox
          onCheckedChange={handleCheck}
          className="absolute top-2 right-2"
          checked={selectedIdsSet.has(file.id)}
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

export const FileCard = memo(FileCardInner)
