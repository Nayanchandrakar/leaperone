import { AnalyticsCharts } from "@/features/analytics/pages/analytics/analytics-charts"
import { AnalyticsFilter } from "@/features/analytics/pages/analytics/analytics-filter"
import { TopGeoList } from "@/features/analytics/pages/analytics/top-geo-list"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AnalyticsPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Analytics</DashboardTitle>
      <AnalyticsFilter />
      <AnalyticsCharts />
      <TopGeoList />
    </DashboardContainer>
  )
}
