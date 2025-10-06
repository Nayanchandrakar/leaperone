import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"
import {
  DashboardStats,
  DashboardStatsGrid,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"

export const DashboardOverviewStats = () => {
  return (
    <DashboardStats>
      <DashboardStatsTitle>Overview</DashboardStatsTitle>
      <DashboardStatsGrid>
        {Array.from({ length: 4 }).map((data) => (
          <MetricCard key={`metric=1-${data}`}>
            <MetricCardLabel>Total scans of your card</MetricCardLabel>
            <MetricCardValue>5689</MetricCardValue>
          </MetricCard>
        ))}
      </DashboardStatsGrid>
    </DashboardStats>
  )
}
