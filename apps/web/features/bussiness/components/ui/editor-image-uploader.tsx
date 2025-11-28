import { Button } from "@app/ui/components/button"
import { cn } from "@app/ui/lib/utils"
import { Upload } from "lucide-react"
import Image from "next/image"

interface EditorImageUploaderProps extends React.ComponentProps<"div"> {
  src: string
}

export const EditorImageUploader = ({ className, src, ...props }: EditorImageUploaderProps) => {
  return (
    <div
      className={cn("relative aspect-square size-29 rounded-lg border border-border", className)}
      {...props}
    >
      <Image fill alt="card-loading-image" className="bg-cover rounded-lg" src={src} />
      <Button
        size="icon-sm"
        variant="ghost"
        className="bg-white border hover:bg-white/95 text-muted-foreground absolute -bottom-1 -right-2"
      >
        <Upload className="size-3" />
      </Button>
    </div>
  )
}
