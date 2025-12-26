import { cn } from "@app/ui/lib/utils"

interface IconBadgeProps {
  Icon: (props: React.HTMLAttributes<SVGElement>) => React.JSX.Element
  className?: string
  iconClassName?: string
}

export const IconBadge = ({ Icon, className, iconClassName }: IconBadgeProps) => {
  return (
    <span className={cn("bg-(--highlight-color) size-8 flex-center rounded-full", className)}>
      <Icon className={cn("stroke-none size-4 fill-white", iconClassName)} />
    </span>
  )
}
