import type { ScanAnalysisRow } from "@app/types"
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
import { useShallow } from "zustand/react/shallow"
import { CHART_CONFIG } from "@/features/dashboard/constants/analytics/chart-config"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"
import { useScanAnalysis } from "@/features/dashboard/hooks/analytics/use-scan-analysis"

interface ScanAnalysisProps {
  isPending: boolean
  rows: ScanAnalysisRow[]
}

export const ScanAnalysis = ({ rows, isPending }: ScanAnalysisProps) => {
  const { timeRange, timeRangeLabel } = useAnalyticsStore(
    useShallow((state) => ({
      timeRange: state.timeRange,
      timeRangeLabel: state.timeRangeLabel,
    })),
  )

  const chartData = useScanAnalysis(rows, timeRange)

  if (isPending) {
    return <Skeleton className="min-h-96.5" />
  }

  return (
    <Card className=" text-muted-foreground bg-muted shadow-none border-zinc-300">
      <CardHeader>
        <CardTitle className="font-medium text-base ">Scan Analysis for {timeRangeLabel}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={CHART_CONFIG}
          className="[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-zinc-200"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} stroke="var(--border)" />
            <XAxis dataKey="date" tickLine={false} tickMargin={10} axisLine={true} />
            <YAxis tickLine={false} axisLine={true} tickMargin={10} width="auto" />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent verticalAlign="bottom" />} />
            <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" />
            <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
