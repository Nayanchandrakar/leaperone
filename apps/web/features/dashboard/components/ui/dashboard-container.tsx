import { cn } from "@app/ui/lib/utils"

export function DashboardContainer({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("container my-8 flex flex-col flex-1", className)} {...props} />
}
