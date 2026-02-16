import { endOfDay } from "date-fns"
import { create } from "zustand"
import type { TimeRangeValue } from "@/features/analytics/types"
import { getStartDateByTimeRange } from "@/features/analytics/utils/analytics/extract-date"

type TimeRangeStore = {
  to: Date
  from: Date
  timeRange: TimeRangeValue
  setTimeRange: (timeRange: TimeRangeValue) => void
}

export const useTimeRange = create<TimeRangeStore>()((set) => {
  const now = new Date()
  const to = endOfDay(now)
  const defaultTimeRange: TimeRangeValue = "last-7-days"
  const from = getStartDateByTimeRange(defaultTimeRange)

  return {
    to,
    from,
    timeRange: defaultTimeRange,
    setTimeRange: (timeRange) => {
      const from = getStartDateByTimeRange(timeRange)
      set({ from, timeRange })
    },
  }
})
