import { cn } from "@app/ui/lib/utils"

export function AgreementHeading({ className, ...props }: React.ComponentProps<"h4">) {
  return <h4 className={cn("text-base font-semibold text-foreground", className)} {...props} />
}

export function AgreementDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p className={cn("text-sm font-medium text-muted-foreground", className)} {...props} />
}
