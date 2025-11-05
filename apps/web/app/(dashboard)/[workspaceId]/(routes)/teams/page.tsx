// import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"
import { TeamMemberInvitations } from "@/features/dashboard/components/pages/teams/team-member-invitations"
import { TeamsControlBar } from "@/features/dashboard/components/pages/teams/teams-controls-bar"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function TeamsPage({ params }: Props) {
  // const pipeline = await DashboardPipeline.init(params)
  // await pipeline.checkMembership()
  // await pipeline.checkPermissions(["manage:members"])
  // await pipeline.checkSubscription()

  return (
    <DashboardContainer>
      <DashboardTitle>Team Zone</DashboardTitle>
      <TeamsControlBar />
      {/* <TeamDashboardOverview user={session.user} /> */}
      <TeamMemberInvitations />
    </DashboardContainer>
  )
}
