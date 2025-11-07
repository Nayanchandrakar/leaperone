"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useShallow } from "zustand/react/shallow"
import { ANALYTICS_TIME_RANGES } from "@/features/analytics/constants/analytics/analytics-time-range"
import { useAnalyticsFilter } from "@/features/analytics/hooks/analytics/use-analytics-filter"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"

export const DateRangePicker = () => {
  const { timeRange, setTimeRangeById } = useAnalyticsFilter(
    useShallow((state) => ({
      timeRange: state.timeRange,
      setTimeRangeById: state.setTimeRangeById,
    })),
  )

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Analytics Time Range</SortFilterBarLabel>
      <Select defaultValue={timeRange?.value} onValueChange={(type) => setTimeRangeById(type)}>
        <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {ANALYTICS_TIME_RANGES.map(({ title, value }) => (
              <SelectItem key={value} value={value}>
                {title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SortFilterBar>
  )
}
