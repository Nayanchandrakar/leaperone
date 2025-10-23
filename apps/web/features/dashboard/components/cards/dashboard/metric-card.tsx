import { cn } from "@app/ui/lib/utils"

export const MetricCard = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("space-y-3.5 bg-zinc-100 p-6 rounded-xl border border-zinc-300", className)}
      {...props}
    />
  )
}

export const MetricCardLabel = ({ className, ...props }: React.ComponentProps<"p">) => {
  return <p className={cn("font-normal text-sm text-muted-foreground", className)} {...props} />
}

export const MetricCardValue = ({ className, ...props }: React.ComponentProps<"span">) => {
  return <span className={cn("font-normal text-2xl text-primary", className)} {...props} />
}
