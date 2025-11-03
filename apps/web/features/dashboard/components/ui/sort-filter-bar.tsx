import { cn } from "@app/ui/lib/utils"

export const SortFilterBar = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("flex items-center justify-center gap-3", className)} {...props} />
}

export const SortFilterBarLabel = ({ className, ...props }: React.ComponentProps<"span">) => {
  return <span className={cn("text-muted-foreground text-sm", className)} {...props} />
}
