import { cn } from "@app/ui/lib/utils"

export const DashboardTitle = ({ className, ...props }: React.ComponentProps<"h3">) => (
  <h3 className={cn("font-semibold text-2xl", className)} {...props} />
)

export const DashboardSubtitle = ({ className, ...props }: React.ComponentProps<"h4">) => (
  <h4 className={cn("text-start font-semibold text-lg", className)} {...props} />
)

export const DashboardDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={cn("text-start text-muted-foreground text-sm font-normal", className)} {...props} />
)
