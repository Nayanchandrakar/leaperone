import type { AnalyticsResult } from "@app/types"
import { CardTitle } from "@app/ui/components/card"
import { GeoChartItem } from "@/features/analytics/cards/analytics/geo-chart-item"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"

const countryFormatter = new Intl.DisplayNames(["en"], { type: "region" })

type TopCountryProps = {
  data: AnalyticsResult
}

export const TopCountries = ({ data }: TopCountryProps) => {
  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">Countries - Till Top 10</CardTitle>
      <div className="space-y-4">
        {data.topCountries.map(({ country, count }, index) => (
          <GeoChartItem
            key={index}
            count={count}
            label={countryFormatter.of(country)!}
            percentage={Number(((count / data.scansInRange) * 100).toFixed(1))}
          />
        ))}
      </div>
    </MetricCard>
  )
}
