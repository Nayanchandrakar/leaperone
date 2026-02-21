import type { GeoRegionRow } from "@app/types"
import { CardTitle } from "@app/ui/components/card"
import { ListComponent } from "@/components/shared/list-component"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"
import { GeoChart } from "@/features/dashboard/components/charts/analytics/geo-chart"

type TopRegionProps = {
  scansInRange: number
  topRegions: GeoRegionRow[]
}

export const TopRegions = ({ scansInRange, topRegions }: TopRegionProps) => {
  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">States - Till Top 10</CardTitle>
      <ListComponent
        items={topRegions}
        className="space-y-4"
        renderItem={({ count, region, country }, index) => (
          <GeoChart
            key={index}
            count={count}
            label={`${region}, (${country})`}
            percentage={Number(((count / scansInRange) * 100).toFixed(1))}
          />
        )}
      />
    </MetricCard>
  )
}
