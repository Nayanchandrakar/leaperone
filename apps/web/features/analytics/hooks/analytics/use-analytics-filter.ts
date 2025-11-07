import { create } from "zustand"
import { ANALYTICS_TIME_RANGES } from "@/features/analytics/constants/analytics/analytics-time-range"
import type { AnalyticsTimeRange } from "@/features/analytics/types"

type AnalyticsFilterStore = {
  timeRange: AnalyticsTimeRange
  setTimeRangeById: (id: string) => void
}

export const useAnalyticsFilter = create<AnalyticsFilterStore>()((set) => ({
  timeRange: ANALYTICS_TIME_RANGES[2]!,
  setTimeRangeById(id: string) {
    return set({
      timeRange:
        ANALYTICS_TIME_RANGES.find((range) => range.value === id) ?? ANALYTICS_TIME_RANGES[2]!,
    })
  },
}))
