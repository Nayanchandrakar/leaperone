import { FileAudio, FileText, FileVideo, ImageIcon } from "lucide-react"

type FileCardIconProps = {
  type: string
}

// File icons
export function FileCardIcon({ type }: FileCardIconProps) {
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
