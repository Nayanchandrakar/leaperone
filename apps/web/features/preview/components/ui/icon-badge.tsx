import { cn } from "@app/ui/lib/utils"
import type { LucideIcon } from "lucide-react"

interface IconBadgeProps {
  className?: string
  iconClassName?: string
  Icon: LucideIcon | ((props: React.HTMLAttributes<SVGElement>) => React.JSX.Element)
}

export const IconBadge = ({ Icon, className, iconClassName }: IconBadgeProps) => {
  return (
    <span className={cn("bg-(--highlight-color) size-8 flex-center rounded-full", className)}>
      <Icon className={cn("stroke-none size-4 fill-white", iconClassName)} />
    </span>
  )
}
