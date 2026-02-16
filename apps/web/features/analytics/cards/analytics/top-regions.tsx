import { CardTitle } from "@app/ui/components/card"
import { GeoChartItem } from "@/features/analytics/cards/analytics/geo-chart-item"
import { useTopRegions } from "@/features/analytics/hooks/analytics/use-top-regions"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"
import type { GetAnalyticsRes } from "@/types/api-types"

type TopRegionProps = {
  data: GetAnalyticsRes
}

export const TopRegions = ({ data }: TopRegionProps) => {
  const topRegions = useTopRegions(data.records)

  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">Cities - Till Top 10</CardTitle>
      <div className="space-y-4">
        {topRegions.map(({ count, country, region }) => {
          const percentage = Math.round((count / data.scansInRange) * 100)
          return (
            <GeoChartItem
              key={country}
              count={count}
              percentage={percentage}
              label={`${region} (${country})`}
            />
          )
        })}
      </div>
    </MetricCard>
  )
}
