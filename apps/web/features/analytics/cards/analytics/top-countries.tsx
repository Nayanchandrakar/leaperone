import { CardTitle } from "@app/ui/components/card"
import { GeoChartItem } from "@/features/analytics/cards/analytics/geo-chart-item"
import { useTopCountries } from "@/features/analytics/hooks/analytics/use-top-countries"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"
import type { GetAnalyticsRes } from "@/types/api-types"

type TopCountryProps = {
  data: GetAnalyticsRes
}

export const TopCountries = ({ data }: TopCountryProps) => {
  const topCountries = useTopCountries(data.records)

  // Create display names formatter for countries (created once outside loops)
  const countryFormatter = new Intl.DisplayNames(["en"], { type: "region" })

  return (
    <MetricCard>
      <CardTitle className="text-base text-muted-foreground">Countries - Till Top 10</CardTitle>
      <div className="space-y-4">
        {topCountries.map(([country, count], index) => {
          const percentage = Math.round((count / data.scansInRange) * 100)
          return (
            <GeoChartItem
              key={index}
              count={count}
              percentage={percentage}
              label={countryFormatter.of(country)!}
            />
          )
        })}
      </div>
    </MetricCard>
  )
}
