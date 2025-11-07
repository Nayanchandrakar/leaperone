import {
  MetricCard,
  MetricCardLabel,
} from "@/features/dashboard/components/cards/dashboard/metric-card"

export const TopLocationsCard = () => {
  return (
    <MetricCard className="sm:row-span-2">
      <MetricCardLabel className="font-medium">Top 5 Locations</MetricCardLabel>
      <ol className="flex flex-col gap-2 list-decimal list-inside">
        {Array.from({ length: 5 }).map((_, index) => (
          <li className="text-sm text-muted-foreground font-normal" key={index}>
            Toronto, Canada
          </li>
        ))}
      </ol>
    </MetricCard>
  )
}
