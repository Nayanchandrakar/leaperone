import { Info } from "lucide-react"
import {
  TeamOverviewCard,
  TeamOverviewCardLabel,
} from "@/features/dashboard/components/cards/teams/team-overview-card"
import { MemberStatusIndicator } from "@/features/dashboard/components/ui/member-status-indicator"
import { MEMBER_STATUS } from "@/features/dashboard/constants/teams/member-status"
import { ToolTipProvider } from "@/features/subscription/components/ui/tooltip-provider"

export const MemberStatusCard = () => {
  return (
    <TeamOverviewCard className="space-y-2">
      <TeamOverviewCardLabel>Member Status</TeamOverviewCardLabel>
      <ul className="space-y-1">
        {MEMBER_STATUS.map(({ color, description, id, label }) => (
          <li key={id} className="flex items-center gap-3">
            <MemberStatusIndicator className={color} />
            <p className="text-muted-foreground font-normal text-sm">{label}</p>
            <ToolTipProvider content={description} Icon={Info} />
          </li>
        ))}
      </ul>
    </TeamOverviewCard>
  )
}
