import { cn } from "@app/ui/lib/utils"

export const TeamOverview = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("space-y-2.5 bg-muted px-5 py-4 rounded-xl border border-zinc-300", className)}
      {...props}
    />
  )
}

export const TeamOverviewLabel = ({ className, ...props }: React.ComponentProps<"p">) => {
  return <p className={cn("font-medium text-sm text-muted-foreground", className)} {...props} />
}
