"use client"

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
import { ChartDescription, ChartHeading, ChartTitle } from "@/features/analytics/ui/chart-heading"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

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
}
export const DayAnalysisChart = ({ isPending }: DayAnalysisChartProps) => {
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
                  dataKey="month"
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
