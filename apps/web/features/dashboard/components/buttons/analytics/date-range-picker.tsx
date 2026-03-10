import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useShallow } from "zustand/react/shallow"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"
import { TIME_RANGES } from "@/features/dashboard/constants/analytics/time-ranges"
import { useAnalyticsStore } from "@/features/dashboard/hooks/analytics/use-analytics-store"

interface DateRangePickerProps {
  isPending: boolean
}

export function DateRangePicker({ isPending }: DateRangePickerProps) {
  const { timeRange, setTimeRange } = useAnalyticsStore(
    useShallow((state) => ({
      timeRange: state.timeRange,
      setTimeRange: state.setTimeRange,
    })),
  )

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Analytics Time Range</SortFilterBarLabel>
      <Select disabled={isPending} defaultValue={timeRange} onValueChange={setTimeRange}>
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
