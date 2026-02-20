"use client"

import { format } from "date-fns"
import { useShallow } from "zustand/react/shallow"
import { useAnalyticsStore } from "@/features/analytics/hooks/analytics/use-analytics-store"

export const ChosenTimeRangeDisplay = () => {
  const { from, to } = useAnalyticsStore(
    useShallow((state) => ({
      to: state.to,
      from: state.from,
    })),
  )

  const startDate = format(from, "dd MMM, yyyy")
  const endDate = format(to, "dd MMM, yyyy")

  return (
    <p className="text-muted-foreground text-sm text-right">
      <span className="font-medium">Dates of chosen time range: </span>
      <span className="font-normal">
        {startDate} - {endDate}
      </span>
    </p>
  )
}
