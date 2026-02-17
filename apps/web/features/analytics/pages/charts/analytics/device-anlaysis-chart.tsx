"use client"

import type { Analytics } from "@app/database/types"
import { Card, CardContent, CardHeader, CardTitle } from "@app/ui/components/card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@app/ui/components/chart"
import { Skeleton } from "@app/ui/components/skeleton"
import { Pie, PieChart } from "recharts"
import { useDeviceAnalysis } from "@/features/analytics/hooks/analytics/use-device-analysis"
import { ChartDescription, ChartHeading, ChartTitle } from "@/features/analytics/ui/chart-heading"

export const description = "A pie chart with a label"

const chartConfig = {
  clicks: {
    label: "Scans",
  },
} satisfies ChartConfig

interface DeviceAnalysisChartProps {
  isPending: boolean
  records: Analytics[]
}

export const DeviceAnalysisChart = ({ isPending, records }: DeviceAnalysisChartProps) => {
  const chartData = useDeviceAnalysis(records)

  return (
    <section className="flex flex-col gap-5">
      <ChartHeading>
        <ChartTitle>Device Analysis</ChartTitle>
        <ChartDescription>
          This informs which from which type of devices scanning are done
        </ChartDescription>
      </ChartHeading>

      {isPending ? (
        <Skeleton className="min-h-88.5" />
      ) : (
        <Card className="flex flex-col bg-muted shadow-none border-zinc-300">
          <CardHeader>
            <CardTitle className="font-medium text-base text-muted-foreground">
              Device Analysis for Last 7 days
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie data={chartData} dataKey="clicks" nameKey="os" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
