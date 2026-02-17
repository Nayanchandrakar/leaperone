import { CardTitle } from "@app/ui/components/card"
import { GeoChartItem } from "@/features/analytics/cards/analytics/geo-chart-item"
import { useTopCities } from "@/features/analytics/hooks/analytics/use-top-cities"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"
import type { GetAnalyticsRes } from "@/types/api-types"

type TopCityProps = {
  data: GetAnalyticsRes
}

export const TopCities = ({ data }: TopCityProps) => {
  const topCities = useTopCities(data.records)

  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">Cities - Till Top 10</CardTitle>
      <div className="space-y-4">
        {topCities.map(({ city, count, country }, index) => {
          const percentage = Math.round((count / data.scansInRange) * 100)
          return (
            <GeoChartItem
              key={index}
              count={count}
              percentage={percentage}
              label={`${city} (${country})`}
            />
          )
        })}
      </div>
    </MetricCard>
  )
}
