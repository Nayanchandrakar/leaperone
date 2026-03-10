import type { GeoCountRow } from "@app/types"
import { CardTitle } from "@app/ui/components/card"
import { ListComponent } from "@/components/shared/list-component"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"
import { GeoChart } from "@/features/dashboard/components/charts/analytics/geo-chart"

const countryFormatter = new Intl.DisplayNames(["en"], { type: "region" })

type TopCountryProps = {
  scansInRange: number
  topCountries: GeoCountRow[]
}

export function TopCountries({ scansInRange, topCountries }: TopCountryProps) {
  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">Countries - Till Top 10</CardTitle>
      <ListComponent
        items={topCountries}
        className="space-y-4"
        renderItem={({ country, count }, index) => (
          <GeoChart
            key={index}
            count={count}
            label={countryFormatter.of(country)!}
            percentage={Number(((count / scansInRange) * 100).toFixed(1))}
          />
        )}
      />
    </MetricCard>
  )
}
