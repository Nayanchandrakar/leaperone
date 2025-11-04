import {
  MetricCard,
  MetricCardLabel,
  MetricCardValue,
} from "@/features/dashboard/components/cards/dashboard/metric-card"
import {
  DashboardStats,
  DashboardStatsFooter,
  DashboardStatsGrid,
  DashboardStatsLink,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"

export const DashboardOverviewStats = () => {
  return (
    <DashboardStats>
      <DashboardStatsTitle>Overview</DashboardStatsTitle>
      <DashboardStatsGrid>
        <MetricCard>
          <MetricCardLabel>Total scans of your card</MetricCardLabel>
          <MetricCardValue>5689</MetricCardValue>
        </MetricCard>

        <MetricCard>
          <MetricCardLabel>Current Month Scans</MetricCardLabel>
          <MetricCardValue>426</MetricCardValue>
        </MetricCard>

        <MetricCard>
          <MetricCardLabel>Number of forms submited</MetricCardLabel>
          <MetricCardValue>73</MetricCardValue>
        </MetricCard>

        <MetricCard>
          <MetricCardLabel>Leaper One seats in use</MetricCardLabel>
          <MetricCardValue>4/5</MetricCardValue>
        </MetricCard>
      </DashboardStatsGrid>

      <DashboardStatsFooter>
        <DashboardStatsLink href="/analytics">View more analytics</DashboardStatsLink>
      </DashboardStatsFooter>
    </DashboardStats>
  )
}
