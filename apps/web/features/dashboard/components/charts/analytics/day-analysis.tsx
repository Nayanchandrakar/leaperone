import type { DayAnalysisRow } from "@app/types"
import { Card, CardContent, CardHeader, CardTitle } from "@app/ui/components/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@app/ui/components/chart"
import { Skeleton } from "@app/ui/components/skeleton"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartDescription,
  ChartHeading,
  ChartTitle,
} from "@/features/dashboard/components/ui/chart-heading"
import { CHART_CONFIG } from "@/features/dashboard/constants/analytics/chart-config"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"
import { useDayAnalysis } from "@/features/dashboard/hooks/analytics/use-day-analysis"

interface DayAnalysisProps {
  isPending: boolean
  rows: DayAnalysisRow[]
}

export const DayAnalysis = ({ isPending, rows }: DayAnalysisProps) => {
  const timeRangeLabel = useAnalyticsStore((state) => state.timeRangeLabel)
  const chartData = useDayAnalysis(rows)
  return (
    <section className="flex flex-col gap-5">
      <ChartHeading>
        <ChartTitle>Day Analysis</ChartTitle>
        <ChartDescription>This inform at what time scans are done</ChartDescription>
      </ChartHeading>

      {isPending ? (
        <Skeleton className="min-h-96.5" />
      ) : (
        <Card className=" text-muted-foreground bg-muted shadow-none border-zinc-300">
          <CardHeader>
            <CardTitle className="font-medium text-base ">
              Scan count by Day for {timeRangeLabel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={CHART_CONFIG}
              className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-zinc-200"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={true}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis tickLine={false} axisLine={true} tickMargin={10} width="auto" />

                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent verticalAlign="bottom" />} />
                <Bar
                  dataKey="desktop"
                  stackId="a"
                  fill="var(--color-desktop)"
                  radius={[0, 0, 4, 4]}
                />

                <Bar
                  dataKey="mobile"
                  stackId="a"
                  fill="var(--color-mobile)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
