"use client"

import { useShallow } from "zustand/react/shallow"
import { AnalyticsFilters } from "@/features/dashboard/components/filters/analytics"
import { AnalyticsCharts } from "@/features/dashboard/components/pages/analytics/analytics-charts"
import { TopGeoList } from "@/features/dashboard/components/pages/analytics/top-geo-list"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"
import { useAnalytics } from "@/features/dashboard/hooks/analytics/use-analytics"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"

export default function AnalyticsPage() {
  const storeValues = useAnalyticsStore(
    useShallow((state) => ({
      to: state.to,
      from: state.from,
      memberId: state.memberId,
    })),
  )

  const { data, isPending } = useAnalytics(storeValues)

  const {
    topCities = [],
    topRegions = [],
    totalClicks = 0,
    scansInRange = 0,
    dayAnalysis = [],
    topCountries = [],
    timeAnalysis = [],
    scanAnalysis = [],
    deviceAnalysis = [],
    browserAnalysis = [],
  } = data ?? {}

  return (
    <DashboardContainer>
      <DashboardTitle>Analytics</DashboardTitle>
      <AnalyticsFilters isPending={isPending} />
      <AnalyticsCharts
        isPending={isPending}
        topCities={topCities}
        totalClicks={totalClicks}
        dayAnalysis={dayAnalysis}
        scanAnalysis={scanAnalysis}
        timeAnalysis={timeAnalysis}
        scansInRange={scansInRange}
        topCountries={topCountries}
        deviceAnalysis={deviceAnalysis}
        browserAnalysis={browserAnalysis}
      />
      <TopGeoList
        isPending={isPending}
        topCities={topCities}
        topRegions={topRegions}
        scansInRange={scansInRange}
        topCountries={topCountries}
      />
    </DashboardContainer>
  )
}
