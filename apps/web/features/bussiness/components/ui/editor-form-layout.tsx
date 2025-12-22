import { cn } from "@app/ui/lib/utils"
import { memo } from "react"

export const EditorSubSortTwoColumnGrid = memo(
  ({ className, ...props }: React.ComponentProps<"div">) => {
    return (
      <div
        className={cn(
          "grid grid-cols-1 gap-4 @lg/editor-sub-sort:grid-cols-[minmax(220px,0.3fr)_1.7fr]",
          className,
        )}
        {...props}
      />
    )
  },
)
