import { useCallback, useMemo } from "react"
import type { ChangeType } from "@/features/bussiness/types"

interface useTimePickerProps {
  value: Date
  onChange: (date: Date) => void
}

export const useTimePicker = ({ value, onChange }: useTimePickerProps) => {
  const timeValues = useMemo(() => {
    const hours = value?.getHours()
    const minutes = value?.getMinutes()
    const hour12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours
    const meridiem = hours >= 12 ? "PM" : "AM"
    return { hour12, minutes, meridiem }
  }, [value])

  const handleHourChange = useCallback(
    (type: ChangeType) => {
      const newDate = new Date(value)
      const currentHour = newDate?.getHours()
      const newHour = type === "increment" ? (currentHour + 1) % 24 : (currentHour - 1 + 24) % 24
      newDate.setHours(newHour)
      onChange(newDate)
    },
    [value, onChange],
  )

  const handleMinuteChange = useCallback(
    (type: ChangeType) => {
      const newDate = new Date(value)
      const currentMinute = newDate?.getMinutes()
      const newMinute =
        type === "increment" ? (currentMinute + 1) % 60 : (currentMinute - 1 + 60) % 60
      newDate.setMinutes(newMinute)
      onChange(newDate)
    },
    [value, onChange],
  )

  const handleMeridiemToggle = useCallback(() => {
    const newDate = new Date(value)
    const currentHour = newDate?.getHours()
    const newHour = currentHour >= 12 ? currentHour - 12 : currentHour + 12
    newDate.setHours(newHour)
    onChange(newDate)
  }, [value, onChange])

  const formattedTime = useMemo(() => {
    const { hour12, minutes, meridiem } = timeValues
    const paddedMinutes = minutes?.toString()?.padStart(2, "0")
    return `${hour12}:${paddedMinutes} ${meridiem}`
  }, [timeValues])

  const paddedMinutes = timeValues?.minutes?.toString()?.padStart(2, "0")

  return {
    timeValues,
    formattedTime,
    paddedMinutes,
    handleHourChange,
    handleMinuteChange,
    handleMeridiemToggle,
  }
}
