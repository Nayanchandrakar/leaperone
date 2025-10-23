import { cn } from "@app/ui/lib/utils"

export const DashboardStats = ({ className, ...props }: React.ComponentProps<"div">) => {
  return <div className={cn("space-y-3 mt-8", className)} {...props} />
}

export const DashboardStatsTitle = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      className={cn("text-base font-medium text-start text-muted-foreground", className)}
      {...props}
    />
  )
}

export const DashboardStatsGrid = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5", className)}
      {...props}
    />
  )
}
