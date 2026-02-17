"use client"

import { useAnalytics } from "@/features/analytics/hooks/analytics/use-analytics"
import { AnalyticsCharts } from "@/features/analytics/pages/analytics/analytics-charts"
import { AnalyticsFilter } from "@/features/analytics/pages/analytics/analytics-filter"
import { TopGeoList } from "@/features/analytics/pages/analytics/top-geo-list"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AnalyticsPage() {
  const { data, isPending } = useAnalytics()

  console.log(data)

  return (
    <DashboardContainer>
      <DashboardTitle>Analytics</DashboardTitle>
      <AnalyticsFilter />
      <AnalyticsCharts isPending={isPending} data={data!} />
      <TopGeoList isPending={isPending} data={data!} />
    </DashboardContainer>
  )
}
