import { endOfDay } from "date-fns"
import { create } from "zustand"
import type { TimeRangeValue } from "@/features/analytics/types"
import { getDateByTimeRange, getTimeRangeLabel } from "@/features/analytics/utils/analytics"

const now = new Date()
const DEFAULT_TIME_RANGE: TimeRangeValue = "last-7-days"

interface AnalyticsStoreState {
  to: Date
  from: Date
  memberId: string | undefined
  timeRangeLabel: string
  timeRange: TimeRangeValue
  setTimeRange: (timeRange: TimeRangeValue) => void
  setMemberId: (memberId: string | undefined) => void
}

export const useAnalyticsStore = create<AnalyticsStoreState>((set) => ({
  to: endOfDay(now),
  memberId: undefined,
  timeRange: DEFAULT_TIME_RANGE,
  from: getDateByTimeRange(DEFAULT_TIME_RANGE),
  timeRangeLabel: getTimeRangeLabel(DEFAULT_TIME_RANGE),

  setMemberId(memberId: string | undefined) {
    return set(() => ({ memberId }))
  },

  setTimeRange(timeRange: TimeRangeValue) {
    return set(() => ({
      timeRange,
      from: getDateByTimeRange(timeRange),
      timeRangeLabel: getTimeRangeLabel(timeRange),
    }))
  },
}))
