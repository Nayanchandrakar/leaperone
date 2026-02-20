import type { AnalyticsResult } from "@app/types"
import {
  MetricCard,
  MetricCardLabel,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

const countryFormatter = new Intl.DisplayNames(["en"], { type: "region" })

interface TopLocationsCardProps {
  data: AnalyticsResult
}

export const TopLocationsCard = ({ data }: TopLocationsCardProps) => {
  const topFive = data.topCities.slice(0, 5)

  return (
    <MetricCard className="sm:row-span-2">
      <MetricCardLabel className="font-medium">Top 5 Locations</MetricCardLabel>
      <ol className="flex flex-col gap-2 list-decimal list-inside">
        {topFive.map(({ country, city }, index) => (
          <li key={index} className="text-sm text-muted-foreground font-normal truncate">
            {city}, {countryFormatter.of(country)}
          </li>
        ))}
      </ol>
    </MetricCard>
  )
}
