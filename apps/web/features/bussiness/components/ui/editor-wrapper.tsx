import { cn } from "@app/ui/lib/utils"
import { memo } from "react"

export const EditorWrapper = memo(({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "p-2.5 xs:p-4 sm:p-6 lg:p-8 bg-background border rounded-3xl h-fit",
        "has-data-[slot=section-button]:space-y-5 has-data-[slot=section-button]:sm:space-y-6 has-data-[slot=section-button]:lg:space-y-8",
        className,
      )}
      {...props}
    />
  )
})
