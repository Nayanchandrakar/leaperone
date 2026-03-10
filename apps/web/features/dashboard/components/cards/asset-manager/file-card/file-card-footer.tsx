import { EllipsisVertical } from "lucide-react"
import { FileCardIcon } from "@/features/dashboard/components/cards/asset-manager/file-card/file-icon"

type FileCardFooterProps = {
  name: string
  type: string
}

export function FileCardFooter({ name, type }: FileCardFooterProps) {
  return (
    <div className="bg-muted w-full p-4 flex items-center justify-between">
      <span className="flex items-center gap-1.5 ">
        <FileCardIcon type={type} />
        <p className="text-xs truncate max-w-32 font-normal text-muted-foreground">{name}</p>
      </span>
      <EllipsisVertical className="size-4" />
    </div>
  )
}
