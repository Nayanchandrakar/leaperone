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
import { TIME_RANGES } from "@/features/analytics/constants/analytics/time-ranges"
import { useTimeRange } from "@/features/analytics/hooks/analytics/use-time-range"
import type { TimeRangeValue } from "@/features/analytics/types"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"

export const DateRangePicker = () => {
  const { timeRange, setTimeRange } = useTimeRange(
    useShallow((state) => ({
      timeRange: state.timeRange,
      setTimeRange: state.setTimeRange,
    })),
  )

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Analytics Time Range</SortFilterBarLabel>
      <Select defaultValue={timeRange} onValueChange={(type: TimeRangeValue) => setTimeRange(type)}>
        <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {TIME_RANGES.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SortFilterBar>
  )
}
