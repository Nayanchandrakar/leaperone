"use client"

import { format } from "date-fns"
import { useAnalyticsFilter } from "@/features/analytics/hooks/analytics/use-analytics-filter"
import { extractDate } from "@/features/analytics/utils/analytics/extract-date"

export const ChosenTimeRangeDisplay = () => {
  const timeRange = useAnalyticsFilter((state) => state.timeRange)
  const { startDate, endDate } = extractDate(timeRange?.value!)

  const startDateFormatted = format(startDate, "dd MMM, yyyy")
  const endDateFormatted = format(endDate, "dd MMM, yyyy")
  const dates = `${startDateFormatted} - ${endDateFormatted}`

  return (
    <p className="text-muted-foreground text-sm text-right">
      <span className="font-medium">Dates of chosen time range: </span>
      <span className="font-normal">{dates}</span>
    </p>
  )
}
