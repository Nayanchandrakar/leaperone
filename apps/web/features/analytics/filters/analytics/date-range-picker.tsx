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
import { useAnalyticsStore } from "@/features/analytics/hooks/analytics/use-analytics-store"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"

interface DateRangePickerProps {
  isDisabled: boolean
}

export const DateRangePicker = ({ isDisabled }: DateRangePickerProps) => {
  const { timeRange, setTimeRange } = useAnalyticsStore(
    useShallow((state) => ({
      timeRange: state.timeRange,
      setTimeRange: state.setTimeRange,
    })),
  )

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Analytics Time Range</SortFilterBarLabel>
      <Select disabled={isDisabled} defaultValue={timeRange} onValueChange={setTimeRange}>
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
