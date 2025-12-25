import { cn } from "@app/ui/lib/utils"
import type { LucideIcon } from "lucide-react"

interface IconBadgeProps {
  icon: LucideIcon
  className?: string
  iconClassName?: string
}

export const IconBadge = ({ icon: Icon, className, iconClassName }: IconBadgeProps) => {
  return (
    <span className={cn("bg-primary size-8 flex-center rounded-full", className)}>
      <Icon className={cn("stroke-none size-4 fill-white", iconClassName)} />
    </span>
  )
}
