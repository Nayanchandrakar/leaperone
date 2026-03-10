import { cn } from "@app/ui/lib/utils"

export function SortFilterBar({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-center gap-3", className)} {...props} />
}

export function SortFilterBarLabel({ className, ...props }: React.ComponentProps<"span">) {
  return <span className={cn("text-muted-foreground text-sm", className)} {...props} />
}
