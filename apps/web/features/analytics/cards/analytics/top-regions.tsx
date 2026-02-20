import type { AnalyticsResult } from "@app/types"
import { CardTitle } from "@app/ui/components/card"
import { GeoChartItem } from "@/features/analytics/cards/analytics/geo-chart-item"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"

type TopRegionProps = {
  data: AnalyticsResult
}

export const TopRegions = ({ data }: TopRegionProps) => {
  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">States - Till Top 10</CardTitle>
      <div className="space-y-4">
        {data.topRegions.map(({ count, region, country }, index) => (
          <GeoChartItem
            key={index}
            count={count}
            label={`${region}, (${country})`}
            percentage={Number(((count / data.scansInRange) * 100).toFixed(1))}
          />
        ))}
      </div>
    </MetricCard>
  )
}
