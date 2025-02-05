"use client"
import { TeamMemberInvitations } from "@/features/dashboard/components/pages/teams/member-invitations"
import { TeamDashboardOverview } from "@/features/dashboard/components/pages/teams/team-dashboard-overview"
import { TeamsControlBar } from "@/features/dashboard/components/pages/teams/teams-controls-bar"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function TeamsPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Team Zone</DashboardTitle>
      <TeamsControlBar />
      <TeamDashboardOverview />
      <TeamMemberInvitations />
    </DashboardContainer>
  )
}
