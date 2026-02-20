import { ChosenTimeRangeDisplay } from "@/features/analytics/filters/analytics/chosen-time-range-display"
import { DateRangePicker } from "@/features/analytics/filters/analytics/date-range-picker"
import { SwitchMember } from "@/features/analytics/filters/analytics/switch-member"

interface AnalyticsFilterProps {
  isDisabled: boolean
}

export const AnalyticsFilter = ({ isDisabled }: AnalyticsFilterProps) => {
  return (
    <div className="border-y mt-8 py-4 flex items-center justify-between gap-3">
      <DateRangePicker isDisabled={isDisabled} />
      <ChosenTimeRangeDisplay />
      <SwitchMember isDisabled={isDisabled} />
    </div>
  )
}
