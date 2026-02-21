import type { GeoCityRow } from "@app/types"
import { CardTitle } from "@app/ui/components/card"
import { ListComponent } from "@/components/shared/list-component"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"
import { GeoChart } from "@/features/dashboard/components/charts/analytics/geo-chart"

type TopCityProps = {
  scansInRange: number
  topCities: GeoCityRow[]
}

export const TopCities = ({ scansInRange, topCities }: TopCityProps) => {
  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">Cities - Till Top 10</CardTitle>
      <ListComponent
        items={topCities}
        className="space-y-4"
        renderItem={({ city, count, country }, index) => (
          <GeoChart
            key={index}
            count={count}
            label={`${city}, (${country})`}
            percentage={Number(((count / scansInRange) * 100).toFixed(1))}
          />
        )}
      />
    </MetricCard>
  )
}
