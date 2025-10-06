import { WifiPen } from "lucide-react"
import {
  QuickActionCard,
  QuickActionCardLabel,
} from "@/features/dashboard/components/cards/dashboard/quick-actions-card"
import {
  DashboardStats,
  DashboardStatsGrid,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"

export const DashboardQuickActions = () => {
  return (
    <DashboardStats>
      <DashboardStatsTitle>Quick Actions</DashboardStatsTitle>

      <DashboardStatsGrid>
        {Array.from({ length: 4 }).map((_, index) => (
          <QuickActionCard href={"/"} key={`sdfsdf-${index}`}>
            <WifiPen className="size-6 text-primary" />
            <QuickActionCardLabel>Buy Nfc Card</QuickActionCardLabel>
          </QuickActionCard>
        ))}
      </DashboardStatsGrid>
    </DashboardStats>
  )
}
