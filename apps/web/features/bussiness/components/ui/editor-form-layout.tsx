import { cn } from "@app/ui/lib/utils"

export const EditorSubSortTwoColumnGrid = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 @lg/editor-sub-sort:grid-cols-[minmax(220px,0.3fr)_1.7fr]",
        className,
      )}
      {...props}
    />
  )
}
