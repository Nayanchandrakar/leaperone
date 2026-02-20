import type { AnalyticsResult } from "@app/types"
import { LocationAnalysisMap } from "@/features/analytics/pages/analytics/location-analysis-map"
import { ScanInfo } from "@/features/analytics/pages/analytics/scan-info"
import { BrowserAnalysisChart } from "@/features/analytics/pages/charts/analytics/browser-analysis-chart"
import { DayAnalysisChart } from "@/features/analytics/pages/charts/analytics/day-anlaysis-chart"
import { DeviceAnalysisChart } from "@/features/analytics/pages/charts/analytics/device-anlaysis-chart"
import { ScanAnalysisChart } from "@/features/analytics/pages/charts/analytics/scan-anlaysis-chart"
import { TimeAnalysisChart } from "@/features/analytics/pages/charts/analytics/time-analysis-chart"

interface AnalyticsChartsProps {
  isPending: boolean
  data: AnalyticsResult
}

export const AnalyticsCharts = ({ isPending, data }: AnalyticsChartsProps) => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-11 mt-8">
      <ScanInfo isPending={isPending} data={data} />
      <ScanAnalysisChart isPending={isPending} data={data} />
      <TimeAnalysisChart isPending={isPending} rows={data?.timeAnalysis} />
      <DayAnalysisChart isPending={isPending} rows={data?.dayAnalysis} />
      <DeviceAnalysisChart isPending={isPending} rows={data?.deviceAnalysis} />
      <BrowserAnalysisChart isPending={isPending} rows={data?.browserAnalysis} />
      <LocationAnalysisMap isPending={isPending} />
    </section>
  )
}
