import { cn } from "@app/ui/lib/utils"

export const AgreementHeading = ({ className, ...props }: React.ComponentProps<"h4">) => (
  <h4 className={cn("text-base font-semibold text-foreground", className)} {...props} />
)

export const AgreementDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <p className={cn("text-sm font-medium text-muted-foreground", className)} {...props} />
)
