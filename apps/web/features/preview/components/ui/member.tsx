import { cn } from "@app/ui/lib/utils"

export const Member = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="member-card" className={cn("flex items-center gap-4", className)} {...props} />
)

export const MemberName = ({ className, ...props }: React.ComponentProps<"h3">) => (
  <div
    data-slot="member-name"
    className={cn("font-template-heading text-sm text-template-muted-foreground", className)}
    {...props}
  />
)

export const MemberDescription = ({ className, ...props }: React.ComponentProps<"p">) => (
  <div
    data-slot="member-description"
    className={cn(
      "font-template-body text-xs text-template-muted-foreground wrap-break-word",
      className,
    )}
    {...props}
  />
)
