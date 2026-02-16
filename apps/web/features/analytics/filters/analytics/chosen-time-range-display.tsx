"use client"

import { format } from "date-fns"
import { useShallow } from "zustand/react/shallow"
import { useTimeRange } from "@/features/analytics/hooks/analytics/use-time-range"

export const ChosenTimeRangeDisplay = () => {
  const { from, to } = useTimeRange(
    useShallow((state) => ({
      to: state.to,
      from: state.from,
    })),
  )

  const startDateFormatted = format(from, "dd MMM, yyyy")
  const endDateFormatted = format(to, "dd MMM, yyyy")
  const dates = `${startDateFormatted} - ${endDateFormatted}`

  return (
    <p className="text-muted-foreground text-sm text-right">
      <span className="font-medium">Dates of chosen time range: </span>
      <span className="font-normal">{dates}</span>
    </p>
  )
}
