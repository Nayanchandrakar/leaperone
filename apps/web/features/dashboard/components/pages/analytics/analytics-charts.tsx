import type {
  BrowserAnalysisRow,
  DayAnalysisRow,
  DeviceAnalysisRow,
  GeoCityRow,
  ScanAnalysisRow,
  TimeAnalysisRow,
} from "@app/types"
import { ScanDetail } from "@/features/dashboard/components/cards/analytics/scan-details"
import { BrowserAnalysis } from "@/features/dashboard/components/charts/analytics/browser-analysis"
import { DayAnalysis } from "@/features/dashboard/components/charts/analytics/day-analysis"
import { DeviceAnalysis } from "@/features/dashboard/components/charts/analytics/device-anlaysis"
import { ScanAnalysis } from "@/features/dashboard/components/charts/analytics/scan-anlaysis"
import { TimeAnalysis } from "@/features/dashboard/components/charts/analytics/time-analysis"
import { LocationAnalysisMap } from "@/features/dashboard/components/pages/analytics/location-analysis-map"

interface AnalyticsChartsProps {
  isPending: boolean
  totalClicks: number
  scansInRange: number
  topCities: GeoCityRow[]
  dayAnalysis: DayAnalysisRow[]
  scanAnalysis: ScanAnalysisRow[]
  timeAnalysis: TimeAnalysisRow[]
  deviceAnalysis: DeviceAnalysisRow[]
  browserAnalysis: BrowserAnalysisRow[]
}

export const AnalyticsCharts = ({
  isPending,
  topCities,
  totalClicks,
  dayAnalysis,
  scansInRange,
  timeAnalysis,
  scanAnalysis,
  deviceAnalysis,
  browserAnalysis,
}: AnalyticsChartsProps) => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-11 mt-8">
      <ScanDetail
        isPending={isPending}
        topCities={topCities}
        totalClicks={totalClicks}
        scansInRange={scansInRange}
      />
      <ScanAnalysis isPending={isPending} rows={scanAnalysis} />
      <TimeAnalysis isPending={isPending} rows={timeAnalysis} />
      <DayAnalysis isPending={isPending} rows={dayAnalysis} />
      <DeviceAnalysis isPending={isPending} rows={deviceAnalysis} />
      <BrowserAnalysis isPending={isPending} rows={browserAnalysis} />
      <LocationAnalysisMap />
    </section>
  )
}
