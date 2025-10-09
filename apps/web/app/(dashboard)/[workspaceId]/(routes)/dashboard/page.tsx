import { DashboardPipeline } from "@/features/dashboard/actions/dashboard-pipeline"
import { DashboardBussinessCard } from "@/features/dashboard/components/pages/dashboard/dashboard-bussiness-card"
import { DashboardOverviewStats } from "@/features/dashboard/components/pages/dashboard/dashboard-overview-stats"
import { DashboardQuickActions } from "@/features/dashboard/components/pages/dashboard/dashboard-quick-actions"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardGreeting } from "@/features/dashboard/components/ui/dashboard-greeting"

interface Props {
  params: Promise<{ workspaceId: string }>
}

export default async function DashboardPage({ params }: Props) {
  const pipeline = await DashboardPipeline.init(params)
  await pipeline.checkMembership()
  await pipeline.checkSubscription()

  const context = pipeline.context
  const user = context.session.user

  return (
    <DashboardContainer>
      <DashboardGreeting name={user.name} />
      <DashboardOverviewStats />
      <DashboardBussinessCard />
      <DashboardQuickActions />
    </DashboardContainer>
  )
}
