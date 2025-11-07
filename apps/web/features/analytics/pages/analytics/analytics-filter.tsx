import { ChosenTimeRangeDisplay } from "@/features/analytics/filters/analytics/chosen-time-range-display"
import { DateRangePicker } from "@/features/analytics/filters/analytics/date-range-picker"
// import { WhoseAnalyticsFilter } from "@/features/analytics/filters/analytics/whose-analytics-filter"

export const AnalyticsFilter = () => {
  return (
    <div className="border-y mt-8 py-4 flex items-center justify-between gap-3">
      <DateRangePicker />
      <ChosenTimeRangeDisplay />
      {/* <WhoseAnalyticsFilter /> */}
    </div>
  )
}
