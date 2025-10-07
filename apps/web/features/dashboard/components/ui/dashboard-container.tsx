import { cn } from "@app/ui/lib/utils"

export const DashboardContainer = ({
  className,
  ...props
}: React.ComponentProps<"section">) => {
  return <section className={cn("container my-8", className)} {...props} />
}
