"use client"

import { LocationAnalysisChart } from "@/features/analytics/pages/analytics/location-analysis-map"
import { ScanInfo } from "@/features/analytics/pages/analytics/scan-info"
import { BrowserAnalysisChart } from "@/features/analytics/pages/charts/analytics/browser-analysis-chart"
import { DayAnalysisChart } from "@/features/analytics/pages/charts/analytics/day-anlaysis-chart"
import { DeviceAnalysisChart } from "@/features/analytics/pages/charts/analytics/device-anlaysis-chart"
import { ScanAnalysisChart } from "@/features/analytics/pages/charts/analytics/scan-anlaysis-chart"
import { TimeAnalysisChart } from "@/features/analytics/pages/charts/analytics/time-analysis-chart"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function AnalyticsPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Analytics</DashboardTitle>

      <section className="grid grid-cols-2 gap-11 mt-8">
        {/* Scan info */}
        <ScanInfo />

        {/* Scan analysis */}
        <ScanAnalysisChart />

        {/* Time analysis */}
        <TimeAnalysisChart />

        {/* Day analysis */}
        <DayAnalysisChart />

        {/* Device analysis */}
        <DeviceAnalysisChart />

        {/* Browser analysis */}
        <BrowserAnalysisChart />

        {/* Location analysis */}
        <LocationAnalysisChart />
      </section>

      <section className="mt-8 grid grid-cols-3 gap-6 h-140">
        <div className="bg-red-400" />
        <div className="bg-blue-400" />
        <div className="bg-green-400" />
      </section>
    </DashboardContainer>
  )
}
