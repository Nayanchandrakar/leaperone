import { Check, X } from "lucide-react"
import { StatusIcon } from "@/components/shared/status-icon"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

interface PriceCompareCardProps {
  name: string
  solo: boolean
  team: boolean
}

export const PriceCompareCard = ({
  name,
  solo,
  team,
}: PriceCompareCardProps) => {
  return (
    <div className="grid rounded-xl border border-border bg-background transition-colors hover:bg-muted lg:grid-cols-[1fr_2fr] divide-y divide-border lg:divide-y-0 lg:divide-x">
      <div className="flex items-start gap-3.5 p-5 sm:p-6 lg:p-8">
        <ToolTipProvider content={name} />
        <p className="text-base font-medium text-start text-muted-foreground -mt-1">
          {name}
        </p>
      </div>

      <div className="grid grid-cols-2 divide-x divide-border">
        <div className="flex items-center justify-center p-5 sm:p-6 lg:p-8">
          <StatusIcon
            Icon={solo ? Check : X}
            variant={solo ? "success" : "error"}
            aria-label={
              solo ? "Available in Solo plan" : "Not available in Solo plan"
            }
          />
        </div>

        <div className="flex items-center justify-center p-5 sm:p-6 lg:p-8">
          <StatusIcon
            Icon={team ? Check : X}
            variant={team ? "success" : "error"}
            aria-label={
              team ? "Available in Team plan" : "Not available in Team plan"
            }
          />
        </div>
      </div>
    </div>
  )
}
