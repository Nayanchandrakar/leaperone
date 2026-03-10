import { cn } from "@app/ui/lib/utils"

export function DashboardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 className={cn("font-semibold text-2xl", className)} {...props} />
}

export function DashboardSubtitle({ className, ...props }: React.ComponentProps<"h4">) {
  return <h4 className={cn("text-start font-semibold text-lg", className)} {...props} />
}

export function DashboardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-start text-muted-foreground text-sm font-normal", className)}
      {...props}
    />
  )
}
