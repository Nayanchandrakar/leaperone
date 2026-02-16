import { useTopLocations } from "@/features/analytics/hooks/analytics/use-top-locations"
import {
  MetricCard,
  MetricCardLabel,
} from "@/features/dashboard/components/cards/dashboard/metric-card"
import type { GetAnalyticsRes } from "@/types/api-types"

interface TopLocationsCardProps {
  data: GetAnalyticsRes
}

export const TopLocationsCard = ({ data }: TopLocationsCardProps) => {
  const topLocations = useTopLocations(data.records)

  // Create display names formatter for countries (created once outside loops)
  const countryFormatter = new Intl.DisplayNames(["en"], { type: "region" })

  return (
    <MetricCard className="sm:row-span-2">
      <MetricCardLabel className="font-medium">Top 5 Locations</MetricCardLabel>
      <ol className="flex flex-col gap-2 list-decimal list-inside">
        {topLocations.map(({ country, city, count }, index) => {
          return (
            <li key={index} className="text-sm text-muted-foreground font-normal">
              {city}, {countryFormatter.of(country)} ({count})
            </li>
          )
        })}
      </ol>
    </MetricCard>
  )
}
