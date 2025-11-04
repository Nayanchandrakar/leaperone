"use client"

import { CLIENT_ENV } from "@app/env/web/client"
import { Checkbox } from "@app/ui/components/checkbox"
import { cn } from "@app/ui/lib/utils"
import { Check, EllipsisVertical, FileAudio, FileText, FileVideo, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useShallow } from "zustand/react/shallow"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"

// Type definitions
type FileCardFooterProps = {
  fileName: string
}

type FileCardCheckboxProps = {
  fileId: string | undefined
}

type FileCardIconProps = {
  type: string
}

// Main file card component
export const FileCard = ({ file }: any) => {
  const isToogled = false
  const isSelectionMode = useAssetStore((state) => state.selectedAssetIds)
  const imageSrc = `${CLIENT_ENV.NEXT_PUBLIC_ASSET_CDN}/${file?.key}`

  return (
    <div
      className={cn(
        "border h-74 rounded-xl relative bg-background transition-colors outline outline-transparent outline-offset-8 hover:outline-primary overflow-hidden flex items-center flex-col ",
        isToogled && "outline-primary",
      )}
    >
      {isToogled && <SelectedIndicator />}

      <Image
        alt="image"
        width={1000}
        sizes="100vw"
        height={1000}
        src={imageSrc}
        className="size-full object-contain"
      />

      {isSelectionMode && <FileCheckbox fileId={file?.id} />}

      <FileCardFooter fileName={file?.name} />
    </div>
  )
}

// FileCard Checkbox component
const FileCheckbox = ({ fileId }: FileCardCheckboxProps) => {
  const { addSelectedAssetId, removeSelectedAssetId, selectedAssetIds } = useAssetStore(
    useShallow((state) => ({
      selectedAssetIds: state.selectedAssetIds,
      addSelectedAssetId: state.addSelectedAssetId,
      removeSelectedAssetId: state.removeSelectedAssetId,
    })),
  )

  const handleCheck = (checked: boolean) => {
    if (!fileId) return

    if (checked) {
      addSelectedAssetId(fileId)
    } else {
      removeSelectedAssetId(fileId)
    }
  }

  const isSelected = selectedAssetIds?.includes(fileId!)

  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={handleCheck}
      className="absolute top-2 right-2"
    />
  )
}

// Tick for selected file
const SelectedIndicator = () => (
  <span className="absolute -top-3 -left-3 bg-primary rounded-full text-white size-4 flex items-center justify-center">
    <Check className="size-3 stroke-3" />
  </span>
)

// File card footer section
const FileCardFooter = ({ fileName }: FileCardFooterProps) => (
  <div className="bg-muted w-full p-4 flex items-center justify-between">
    <div className="flex items-center gap-2 ">
      <FileCardIcon type="image" />
      <p className="text-xs truncate max-w-32 font-normal text-muted-foreground">{fileName}</p>
    </div>
    <EllipsisVertical className="size-4" />
  </div>
)

// File icons
const FileCardIcon = ({ type }: FileCardIconProps) => {
  let Icon = ImageIcon

  if (type?.startsWith("image")) {
    Icon = ImageIcon
  }

  if (type?.startsWith("audio")) {
    Icon = FileAudio
  }

  if (type?.startsWith("video")) {
    Icon = FileVideo
  }

  if (type?.startsWith("application")) {
    Icon = FileText
  }

  return <Icon className="size-4 text-muted-foreground" />
}
