import type { DeviceAnalysisRow } from "@app/types"
import { Card, CardContent, CardHeader, CardTitle } from "@app/ui/components/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@app/ui/components/chart"
import { Skeleton } from "@app/ui/components/skeleton"
import { Pie, PieChart } from "recharts"
import {
  ChartDescription,
  ChartHeading,
  ChartTitle,
} from "@/features/dashboard/components/ui/chart-heading"
import { CHART_CONFIG } from "@/features/dashboard/constants/analytics/chart-config"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"
import { useDeviceAnalysis } from "@/features/dashboard/hooks/analytics/use-device-analysis"

interface DeviceAnalysisProps {
  isPending: boolean
  rows: DeviceAnalysisRow[]
}

export const DeviceAnalysis = ({ isPending, rows }: DeviceAnalysisProps) => {
  const timeRangeLabel = useAnalyticsStore((state) => state.timeRangeLabel)
  const chartData = useDeviceAnalysis(rows)

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
              Device Analysis for {timeRangeLabel}
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 pb-0">
            <ChartContainer config={CHART_CONFIG} className="mx-auto aspect-square max-h-75 mb-4">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie nameKey="os" data={chartData} dataKey="clicks" />
                <ChartLegend
                  content={
                    <ChartLegendContent
                      nameKey="os"
                      className="-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center"
                    />
                  }
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </section>
  )
}
