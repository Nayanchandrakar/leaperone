import { cn } from "@app/ui/lib/utils"

export const TeamOverviewCard = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(
        "space-y-4 bg-zinc-100 p-6 rounded-xl border border-zinc-300",
        className,
      )}
      {...props}
    />
  )
}

export const TeamOverviewCardLabel = ({
  className,
  ...props
}: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("font-medium text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}
