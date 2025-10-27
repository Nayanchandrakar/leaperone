import { EllipsisVertical, ImageIcon } from "lucide-react"

export const AssetCardFooter = () => {
  return (
    <div className="bg-muted w-full p-4 flex items-center justify-between gap-2">
      <div className="flex items-center gap-2 text-muted-foreground ">
        <ImageIcon className="size-4" />
        <span className="text-xs truncate">photo_03162024.jpg</span>
      </div>
      <EllipsisVertical className="size-4" />
    </div>
  )
}
