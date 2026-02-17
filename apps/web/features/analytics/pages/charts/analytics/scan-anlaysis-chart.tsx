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
import { useScanAnalysis } from "@/features/analytics/hooks/analytics/use-scan-analysis"
import { useTimeRange } from "@/features/analytics/hooks/analytics/use-time-range"
import type { GetAnalyticsRes } from "@/types/api-types"

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

interface ScanAnalysisChartProps {
  isPending: boolean
  data: GetAnalyticsRes
}

export const ScanAnalysisChart = ({ data, isPending }: ScanAnalysisChartProps) => {
  const timeRange = useTimeRange((state) => state.timeRange)
  const chartData = useScanAnalysis(data?.records, timeRange)

  if (isPending) {
    return <Skeleton className="min-h-96.5" />
  }

  return (
    <Card className=" text-muted-foreground bg-muted shadow-none border-zinc-300">
      <CardHeader>
        <CardTitle className="font-medium text-base ">Scan Analysis for Last 7 days</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-zinc-200"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={true} />
            <YAxis tickLine={false} axisLine={true} tickMargin={10} width="auto" />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent payload={{ verticalAlign: "bottom" }} />} />
            <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" />
            <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
