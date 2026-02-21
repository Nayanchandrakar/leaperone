import { DateRangePicker } from "@/features/dashboard/components/buttons/analytics/date-range-picker"
import { MemberSwitcher } from "@/features/dashboard/components/buttons/analytics/member-switcher"
import { SelectedTimeRange } from "@/features/dashboard/components/buttons/analytics/selected-time-range"

interface AnalyticsFitlerProps {
  isPending: boolean
}

export const AnalyticsFilters = ({ isPending }: AnalyticsFitlerProps) => {
  return (
    <div className="border-y mt-8 py-4 flex items-center flex-wrap justify-between gap-6">
      <DateRangePicker isPending={isPending} />
      <SelectedTimeRange />
      <MemberSwitcher isDisabled={isPending} />
    </div>
  )
}
