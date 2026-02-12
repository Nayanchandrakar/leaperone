import { TeamMembers } from "@/features/dashboard/components/pages/teams/team-members"
import { TeamsControlBar } from "@/features/dashboard/components/pages/teams/teams-controls-bar"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function TeamsPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Team Zone</DashboardTitle>
      <TeamsControlBar />
      <TeamMembers />
    </DashboardContainer>
  )
}
