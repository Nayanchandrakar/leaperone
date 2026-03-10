import type { GeoCityRow } from "@app/types"
import {
  MetricCard,
  MetricCardLabel,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

const countryFormatter = new Intl.DisplayNames(["en"], { type: "region" })

interface TopLocationsProps {
  topCities: GeoCityRow[]
}

export function TopLocations({ topCities }: TopLocationsProps) {
  return (
    <MetricCard className="sm:row-span-2">
      <MetricCardLabel className="font-medium">Top 5 Locations</MetricCardLabel>
      <ol className="flex flex-col gap-2 list-decimal list-inside">
        {topCities.map(({ country, city }, index) => (
          <li key={index} className="text-sm text-muted-foreground font-normal truncate">
            {city}, {countryFormatter.of(country)}
          </li>
        ))}
      </ol>
    </MetricCard>
  )
}
