import { Tooltip, TooltipContent, TooltipTrigger } from "@app/ui/components/tooltip"
import { cn } from "@app/ui/lib/utils"
import { Info, type LucideIcon } from "lucide-react"

interface IToolTipProvider {
  Icon?: LucideIcon
  iconClassName?: string
  content: React.ReactNode
}

export const ToolTipProvider = ({ Icon = Info, content, iconClassName }: IToolTipProvider) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Icon className={cn("size-4", iconClassName)} />
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )
}
