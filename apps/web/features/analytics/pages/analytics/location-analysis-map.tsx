import { ChartDescription, ChartHeading, ChartTitle } from "@/features/analytics/ui/chart-heading"

export const LocationAnalysisChart = () => {
  return (
    <section className="flex flex-col gap-5 w-full col-span-2">
      <ChartHeading>
        <ChartTitle>Location Analysis</ChartTitle>
        <ChartDescription>
          Know from where people are scanning the card. This may not be fully accurate.
        </ChartDescription>
      </ChartHeading>

      <div className="h-100 bg-amber-400 rounded-lg" />
    </section>
  )
}
