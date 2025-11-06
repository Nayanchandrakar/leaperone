// import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"

import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { getTeamInvitations } from "@/features/dashboard/actions/get-team-invitations"
import { TeamMemberInvitations } from "@/features/dashboard/components/pages/teams/member-invitations"
import { TeamsControlBar } from "@/features/dashboard/components/pages/teams/teams-controls-bar"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"
import { getQueryClient } from "@/utils/query-client"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function TeamsPage({ params }: Props) {
  // const pipeline = await DashboardPipeline.init(params)
  // await pipeline.checkMembership()
  // await pipeline.checkPermissions(["manage:members"])
  // await pipeline.checkSubscription()

  const queryClient = getQueryClient()

  queryClient.prefetchQuery({
    queryKey: ["team-invitations"],
    queryFn: async () => await getTeamInvitations(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardContainer>
        <DashboardTitle>Team Zone</DashboardTitle>
        <TeamsControlBar />
        {/* <TeamDashboardOverview user={session.user} /> */}
        <Suspense fallback={<div>Loading...</div>}>
          <TeamMemberInvitations />
        </Suspense>
      </DashboardContainer>
    </HydrationBoundary>
  )
}
