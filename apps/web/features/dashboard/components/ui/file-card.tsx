import { cn } from "@app/ui/lib/utils"
import { Check, EllipsisVertical } from "lucide-react"
import Image from "next/image"
import type React from "react"
import { getAssetUrl, getIconForMime } from "@/features/dashboard/utils/asset-manager"

export function FileCardFrame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "border h-74 rounded-xl relative bg-background transition-colors outline outline-transparent outline-offset-8 flex items-center flex-col",
        className,
      )}
      {...props}
    />
  )
}

export function FileCardImage({ fileName, imageSrc }: { fileName: string; imageSrc: string }) {
  return (
    <Image
      width={1000}
      sizes="100vw"
      height={1000}
      alt={fileName}
      src={getAssetUrl(imageSrc)}
      className="size-full object-contain"
    />
  )
}

export const FileCardCheckBadge = (
  <span className="absolute -top-3 -left-3 bg-primary rounded-full text-white size-4 flex-center">
    <Check className="size-3 stroke-3" />
  </span>
)

export function FileCardFooter({ fileName, fileMime }: { fileName: string; fileMime: string }) {
  const Icon = getIconForMime(fileMime)
  return (
    <div className="bg-muted rounded-b-xl w-full p-4 flex items-center justify-between">
      <span className="flex items-center gap-1.5">
        <Icon className="size-4 text-muted-foreground" />
        <p className="text-xs truncate max-w-32 font-normal text-muted-foreground">{fileName}</p>
      </span>
      <EllipsisVertical className="size-4" />
    </div>
  )
}
