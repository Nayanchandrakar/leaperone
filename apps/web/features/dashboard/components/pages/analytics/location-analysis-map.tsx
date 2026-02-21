import { Skeleton } from "@app/ui/components/skeleton"
import {
  ChartDescription,
  ChartHeading,
  ChartTitle,
} from "@/features/dashboard/components/ui/chart-heading"

export const LocationAnalysisMap = () => {
  return (
    <section className="flex flex-col gap-5 w-full xl:col-span-2">
      <ChartHeading>
        <ChartTitle>Location Analysis</ChartTitle>
        <ChartDescription>
          Know from where people are scanning the card. This may not be fully accurate.
        </ChartDescription>
      </ChartHeading>

      <Skeleton className="h-100 rounded-xl" />
    </section>
  )
}
