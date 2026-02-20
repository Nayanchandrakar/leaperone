"use client"

import { useShallow } from "zustand/react/shallow"
import { useAnalytics } from "@/features/analytics/hooks/analytics/use-analytics"
import { useAnalyticsStore } from "@/features/analytics/hooks/analytics/use-analytics-store"
import { AnalyticsCharts } from "@/features/analytics/pages/analytics/analytics-charts"
import { AnalyticsFilter } from "@/features/analytics/pages/analytics/analytics-filter"
import { TopGeoList } from "@/features/analytics/pages/analytics/top-geo-list"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AnalyticsPage() {
  const storevalues = useAnalyticsStore(
    useShallow((state) => ({
      to: state.to,
      from: state.from,
      memberId: state.memberId,
    })),
  )

  const { data, isPending } = useAnalytics(storevalues)

  return (
    <DashboardContainer>
      <DashboardTitle>Analytics</DashboardTitle>
      <AnalyticsFilter isDisabled={isPending} />
      <AnalyticsCharts isPending={isPending} data={data!} />
      <TopGeoList isPending={isPending} data={data!} />
    </DashboardContainer>
  )
}
