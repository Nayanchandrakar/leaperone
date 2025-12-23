import { cn } from "@app/ui/lib/utils"
import { memo } from "react"

export const EditorWrapper = memo(({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "p-5 sm:p-6 lg:p-8 bg-zinc-50 border border-gray-300 rounded-3xl lg:rounded-4xl h-fit",
        className,
      )}
      {...props}
    />
  )
})
