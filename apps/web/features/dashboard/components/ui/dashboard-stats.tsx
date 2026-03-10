import { cn } from "@app/ui/lib/utils"
import type { LinkProps } from "next/link"
import Link from "next/link"

export function DashboardStats({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("space-y-3 mt-8", className)} {...props} />
}

export function DashboardStatsTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-base font-medium text-start text-muted-foreground", className)}
      {...props}
    />
  )
}

export function DashboardStatsGrid({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5", className)}
      {...props}
    />
  )
}

export function DashboardStatsFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex justify-end mt-4", className)} {...props} />
}

export function DashboardStatsLink({
  href,
  className,
  ...props
}: React.ComponentProps<"a"> & LinkProps) {
  return (
    <Link
      href={href}
      className={cn("font-normal text-sm text-primary hover:text-primary/90 underline", className)}
      {...props}
    />
  )
}
