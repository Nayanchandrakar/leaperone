import { cn } from "@app/ui/lib/utils"

export const MemberStatusIndicator = ({ className, ...props }: React.ComponentProps<"span">) => {
  return <span className={cn("size-2 rounded-full", className)} {...props} />
}
