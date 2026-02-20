"use client"

import type { BrowserAnalysisRow } from "@app/types"
import { Card, CardContent, CardHeader, CardTitle } from "@app/ui/components/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@app/ui/components/chart"
import { Skeleton } from "@app/ui/components/skeleton"
import { Pie, PieChart } from "recharts"
import { useAnalyticsStore } from "@/features/analytics/hooks/analytics/use-analytics-store"
import { useBrowserAnalysis } from "@/features/analytics/hooks/analytics/use-browser-analysis"
import { ChartDescription, ChartHeading, ChartTitle } from "@/features/analytics/ui/chart-heading"

export const description = "A pie chart with a label"

const chartConfig = {
  clicks: {
    label: "Scans",
  },
} satisfies ChartConfig

interface BrowserAnalysisChartProps {
  isPending: boolean
  rows: BrowserAnalysisRow[]
}

export const BrowserAnalysisChart = ({ isPending, rows }: BrowserAnalysisChartProps) => {
  const timeRangeLabel = useAnalyticsStore((state) => state.timeRangeLabel)
  const chartData = useBrowserAnalysis(rows)

  return (
    <section className="flex flex-col gap-5">
      <ChartHeading>
        <ChartTitle>Browser Analysis</ChartTitle>
        <ChartDescription>This informs which browser is used to scan the most</ChartDescription>
      </ChartHeading>

      {isPending ? (
        <Skeleton className="min-h-88.5" />
      ) : (
        <Card className="flex flex-col bg-muted shadow-none border-zinc-300">
          <CardHeader>
            <CardTitle className="font-medium text-base text-muted-foreground">
              Browser Analysis for {timeRangeLabel}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="clicks" nameKey="browser" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
