import { ListComponent } from "@/components/shared/list-component"
import { StatusItem } from "@/features/dashboard/components/cards/teams/member-status-item"
import { TeamOverview, TeamOverviewLabel } from "@/features/dashboard/components/ui/team-overview"
import { MEMBER_STATUS } from "@/features/dashboard/constants/teams/member-status"

export const MemberStatusList = () => {
  return (
    <TeamOverview>
      <TeamOverviewLabel>Member Status</TeamOverviewLabel>
      <ListComponent
        className="space-y-1.5"
        items={MEMBER_STATUS}
        renderItem={(item) => <StatusItem key={item.id} {...item} />}
      />
    </TeamOverview>
  )
}
