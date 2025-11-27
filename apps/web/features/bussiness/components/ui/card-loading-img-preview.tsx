import { Button } from "@app/ui/components/button"
import { cn } from "@app/ui/lib/utils"
import { Upload } from "lucide-react"
import Image from "next/image"

interface CardLoadingImgPreviewProps extends React.ComponentProps<"div"> {
  src: string
}

export const CardLoadingImgPreview = ({ className, src, ...props }: CardLoadingImgPreviewProps) => {
  return (
    <div
      className={cn("relative aspect-square size-29 rounded-lg border border-border", className)}
      {...props}
    >
      <Image fill alt="card-loading-image" className="bg-cover rounded-lg" src={src} />
      <Button
        size="icon-sm"
        variant="ghost"
        className="bg-white border hover:bg-white/70 text-muted-foreground absolute -bottom-1 -right-2"
      >
        <Upload className="size-3" />
      </Button>
    </div>
  )
}
