import { CLIENT_ENV } from "@app/env/web/client"
import { FileAudio, FileText, FileVideo, ImageIcon } from "lucide-react"
import type { FileType } from "@/features/dashboard/types"

export function getIconForMime(mime: string) {
  const prefix = mime?.split("/")[0]
  return (
    (prefix
      ? {
          image: ImageIcon,
          audio: FileAudio,
          video: FileVideo,
          application: FileText,
        }[prefix]
      : undefined) ?? ImageIcon
  )
}

export function getAssetUrl(key: string) {
  return `${CLIENT_ENV.NEXT_PUBLIC_ASSET_CDN}/${key}`
}

export function isAssetFilterDisabled(
  fileType: FileType,
  isFetching: boolean,
  filesCount: number,
): boolean {
  return isFetching || (fileType === "all" && filesCount === 0)
}
