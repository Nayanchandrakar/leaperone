import type { TimeAnalysisRow } from "@app/types"
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
import { useTimeAnalysis } from "@/features/dashboard/hooks/analytics/use-time-analysis"

interface TimeAnalysisProps {
  isPending: boolean
  rows: TimeAnalysisRow[]
}

export const TimeAnalysis = ({ isPending, rows }: TimeAnalysisProps) => {
  const timeRangeLabel = useAnalyticsStore((state) => state.timeRangeLabel)
  const chartData = useTimeAnalysis(rows)

  return (
    <section className="flex flex-col gap-5">
      <ChartHeading>
        <ChartTitle>Time Analysis</ChartTitle>
        <ChartDescription>This inform at what time scans are done</ChartDescription>
      </ChartHeading>

      {isPending ? (
        <Skeleton className="min-h-96.5" />
      ) : (
        <Card className=" text-muted-foreground bg-muted shadow-none border-zinc-300">
          <CardHeader>
            <CardTitle className="font-medium text-base ">
              Scan count by Time for {timeRangeLabel}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={CHART_CONFIG}
              className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-zinc-200"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} stroke="var(--border)" />
                <XAxis dataKey="time" tickLine={false} tickMargin={10} axisLine={true} />
                <YAxis tickLine={false} axisLine={true} tickMargin={10} width="auto" />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend
                  content={<ChartLegendContent payload={{ verticalAlign: "bottom" }} />}
                />
                <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" />
                <Bar
                  stackId="a"
                  dataKey="mobile"
                  radius={[4, 4, 0, 0]}
                  fill="var(--color-mobile)"
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
