import { ShareBusinessCardDialog } from "@/features/dashboard/components/dialogs/dashboard/share-business-card-dialog"
import { BusinessCardSection } from "@/features/dashboard/components/pages/dashboard/business-card-section"
import { DashboardOverviewStats } from "@/features/dashboard/components/pages/dashboard/dashboard-overview-stats"
import { QuickActions } from "@/features/dashboard/components/pages/dashboard/quick-actions"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"

export default function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardOverviewStats />
      <BusinessCardSection />
      <QuickActions />
      <ShareBusinessCardDialog title="Share Business Card" />
    </DashboardContainer>
  )
}
