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
      <TooltipContent className="max-w-50 text-center">{content}</TooltipContent>
    </Tooltip>
  )
}
