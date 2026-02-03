import { DashboardBussinessCard } from "@/features/dashboard/components/pages/dashboard/dashboard-bussiness-card"
import { DashboardOverviewStats } from "@/features/dashboard/components/pages/dashboard/dashboard-overview-stats"
import { DashboardQuickActions } from "@/features/dashboard/components/pages/dashboard/dashboard-quick-actions"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardGreeting } from "@/features/dashboard/components/ui/dashboard-greeting"

export default function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardGreeting name={"user.name"} />
      <DashboardOverviewStats />
      <DashboardBussinessCard />
      <DashboardQuickActions />
    </DashboardContainer>
  )
}
