"use client"

import type { Analytics } from "@app/database/types"
import { Card, CardContent, CardHeader, CardTitle } from "@app/ui/components/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@app/ui/components/chart"
import { Skeleton } from "@app/ui/components/skeleton"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { useDayAnalysis } from "@/features/analytics/hooks/analytics/use-day-analysis"
import { ChartDescription, ChartHeading, ChartTitle } from "@/features/analytics/ui/chart-heading"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig

interface DayAnalysisChartProps {
  isPending: boolean
  records: Analytics[]
}

export const DayAnalysisChart = ({ isPending, records }: DayAnalysisChartProps) => {
  const chartData = useDayAnalysis(records)
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
              Scan count by Day for Last 7 days
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
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
                <ChartLegend
                  content={<ChartLegendContent payload={{ verticalAlign: "bottom" }} />}
                />
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
