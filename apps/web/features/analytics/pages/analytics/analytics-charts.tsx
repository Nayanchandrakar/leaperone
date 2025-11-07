import { LocationAnalysisMap } from "@/features/analytics/pages/analytics/location-analysis-map"
import { ScanInfo } from "@/features/analytics/pages/analytics/scan-info"
import { BrowserAnalysisChart } from "@/features/analytics/pages/charts/analytics/browser-analysis-chart"
import { DayAnalysisChart } from "@/features/analytics/pages/charts/analytics/day-anlaysis-chart"
import { DeviceAnalysisChart } from "@/features/analytics/pages/charts/analytics/device-anlaysis-chart"
import { ScanAnalysisChart } from "@/features/analytics/pages/charts/analytics/scan-anlaysis-chart"
import { TimeAnalysisChart } from "@/features/analytics/pages/charts/analytics/time-analysis-chart"

export const AnalyticsCharts = () => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-11 mt-8">
      <ScanInfo />
      <ScanAnalysisChart />
      <TimeAnalysisChart />
      <DayAnalysisChart />
      <DeviceAnalysisChart />
      <BrowserAnalysisChart />
      <LocationAnalysisMap />
    </section>
  )
}
