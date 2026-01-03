import { cn } from "@app/ui/lib/utils"
import type { LucideIcon } from "lucide-react"
import type { IconProps } from "@/types"

interface IconBadgeProps {
  className?: string
  iconClassName?: string
  Icon: LucideIcon | ((props: IconProps) => React.JSX.Element)
}

export const IconBadge: React.FC<IconBadgeProps> = ({ Icon, className, iconClassName }) => (
  <span className={cn("bg-template-primary size-9 flex-center rounded-full", className)}>
    <Icon className={cn("size-4", iconClassName)} />
  </span>
)
