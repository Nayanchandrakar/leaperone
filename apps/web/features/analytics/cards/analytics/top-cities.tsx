import type { AnalyticsResult } from "@app/types"
import { CardTitle } from "@app/ui/components/card"
import { GeoChartItem } from "@/features/analytics/cards/analytics/geo-chart-item"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"

type TopCityProps = {
  data: AnalyticsResult
}

export const TopCities = ({ data }: TopCityProps) => {
  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">Cities - Till Top 10</CardTitle>
      <div className="space-y-4">
        {data.topCities.map(({ city, count, country }, index) => (
          <GeoChartItem
            key={index}
            count={count}
            label={`${city}, (${country})`}
            percentage={Number(((count / data.scansInRange) * 100).toFixed(1))}
          />
        ))}
      </div>
    </MetricCard>
  )
}
