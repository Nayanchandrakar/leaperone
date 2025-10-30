import { Checkbox } from "@app/ui/components/checkbox"
import { cn } from "@app/ui/lib/utils"
import { Check, EllipsisVertical, ImageIcon } from "lucide-react"
import Image from "next/image"

export const FileCard = ({ file }: any) => {
  const isSelected = false
  const imageSrc = `https://d1xz2wkhdcnu3k.cloudfront.net/${file.key}`

  return (
    <div
      className={cn(
        "border h-74 rounded-xl relative bg-background transition-colors outline outline-transparent outline-offset-8 hover:outline-primary overflow-hidden flex items-center flex-col ",
        isSelected && "outline-primary",
      )}
    >
      {isSelected && (
        <span className="absolute -top-3 -left-3 bg-primary rounded-full text-white size-4 flex items-center justify-center">
          <Check className="size-3 stroke-3" />
        </span>
      )}
      <Image
        alt="image"
        width={1000}
        height={1000}
        sizes="100vw"
        src={imageSrc}
        className="size-full object-contain"
      />

      <Checkbox defaultChecked className="absolute top-2 right-2" />

      <div className="bg-muted w-full p-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-muted-foreground ">
          <ImageIcon className="size-4" />
          <span className="text-xs truncate max-w-30">{file.name}</span>
        </div>
        <EllipsisVertical className="size-4" />
      </div>
    </div>
  )
}
