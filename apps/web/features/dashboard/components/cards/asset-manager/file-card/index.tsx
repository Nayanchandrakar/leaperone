"use client"

import { cn } from "@app/ui/lib/utils"
import Image from "next/image"
import { FileCheckbox } from "@/features/dashboard/components/cards/asset-manager/file-card/file-card-checkox"
import { FileCardFooter } from "@/features/dashboard/components/cards/asset-manager/file-card/file-card-footer"
import { FileSelectIndicator } from "@/features/dashboard/components/cards/asset-manager/file-card/file-select-indicator"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { useFilePreviewStore } from "@/features/dashboard/hooks/asset-manager/use-file-preview-store"
import type { AssetFile } from "@/features/dashboard/types"
import { getAssetUrl } from "@/features/dashboard/utils/asset-manager"

interface FileCardProps {
  file: AssetFile
}

export const FileCard = ({ file }: FileCardProps) => {
  const { setAsset, setIsOpen, asset } = useFilePreviewStore()
  const isSelectionMode = useAssetStore((state) => state.isSelectionMode)

  const handleClick = () => {
    if (!isSelectionMode) {
      setAsset(file)
      setIsOpen(true)
    }
  }

  const isSelected = asset?.id === file?.id

  return (
    <div
      onClick={handleClick}
      className={cn(
        "border h-74 rounded-xl relative bg-background transition-colors outline outline-transparent outline-offset-8 hover:outline-primary flex items-center flex-col ",
        isSelected && "outline-primary",
      )}
    >
      {/* File select indicator */}
      <FileSelectIndicator isSelected={isSelected} />

      {/* File image */}
      <Image
        width={1000}
        sizes="100vw"
        height={1000}
        alt={file?.name}
        src={getAssetUrl(file?.key)}
        className="size-full object-contain"
      />

      {/* File checkbox */}
      <FileCheckbox fileId={file?.id} isSelectionMode={isSelectionMode} />

      {/* File footer */}
      <FileCardFooter name={file?.name} type={file?.mime!} />
    </div>
  )
}
