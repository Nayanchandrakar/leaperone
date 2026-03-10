import { useCallback, useMemo } from "react"
import type { ChangeType } from "@/features/bussiness/types"

interface useTimePickerProps {
  value: Date
  onChange: (date: Date) => void
}

export function useTimePicker({ value, onChange }: useTimePickerProps) {
  const { hours, minutes, hour12, meridiem, paddedMinutes } = useMemo(() => {
    const hours = value.getUTCHours()
    const minutes = value.getUTCMinutes()
    const hour12 = hours % 12 === 0 ? 12 : hours % 12
    const meridiem = hours >= 12 ? "PM" : "AM"
    return {
      hours,
      hour12,
      minutes,
      meridiem,
      paddedMinutes: String(minutes).padStart(2, "0"),
    }
  }, [value])

  const handleHourChange = useCallback(
    (type: ChangeType) => {
      const newDate = new Date(value)
      const nextHour = type === "increment" ? (hours + 1) % 24 : (hours - 1 + 24) % 24
      newDate.setUTCHours(nextHour)
      onChange(newDate)
    },
    [hours, onChange, value],
  )

  const handleMinuteChange = useCallback(
    (type: ChangeType) => {
      const newDate = new Date(value)
      const nextMinute = type === "increment" ? (minutes + 1) % 60 : (minutes - 1 + 60) % 60
      newDate.setUTCMinutes(nextMinute)
      onChange(newDate)
    },
    [minutes, onChange, value],
  )

  const handleMeridiemToggle = useCallback(() => {
    const newDate = new Date(value)
    const newHour = hours >= 12 ? hours - 12 : hours + 12
    newDate.setUTCHours(newHour)
    onChange(newDate)
  }, [hours, onChange, value])

  return {
    hour12,
    meridiem,
    paddedMinutes,
    handleHourChange,
    handleMinuteChange,
    handleMeridiemToggle,
  }
}
