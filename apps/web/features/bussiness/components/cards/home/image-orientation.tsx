import { cn } from "@app/ui/lib/utils"
import type { ImageView } from "@/features/bussiness/types"

interface ImageOrientationProps extends React.ComponentProps<"div"> {
  orientation: ImageView
}

export function ImageOrientation({ orientation, className, ...rest }: ImageOrientationProps) {
  return (
    <div className={cn("space-y-1 group shrink-0", className)} {...rest}>
      <div className="transition-colors border p-2 rounded-lg hover:border-primary border-border aspect-square w-22 h-17 flex-center cursor-pointer group-data-[state=true]:border-primary">
        <orientation.icon className="group-data-[state=true]:fill-primary fill-zinc-200" />
      </div>
      <p className="text-center text-xs text-muted-foreground font-medium group-data-[state=true]:text-primary">
        {orientation.label}
      </p>
    </div>
  )
}
