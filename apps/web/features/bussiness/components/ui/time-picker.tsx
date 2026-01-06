import { Button } from "@app/ui/components/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { ChevronDown, ChevronUp, Clock } from "lucide-react"
import { useTimePicker } from "@/features/bussiness/hooks/home/use-time-picker"

type TimePickerProps = {
  value: Date
  onChange: (newTime: Date) => void
}

type TimePickerUnitProps = {
  value: string | number
  onIncrement: () => void
  onDecrement: () => void
}

export const TimePickerUnit = ({ value, onIncrement, onDecrement }: TimePickerUnitProps) => {
  return (
    <div className="flex items-center flex-col justify-between gap-6">
      <Button size="icon-sm" variant="gray-outline" onClick={onIncrement}>
        <ChevronUp />
      </Button>
      <span className="font-medium text-base text-muted-foreground tabular-nums">{value}</span>
      <Button size="icon-sm" variant="gray-outline" onClick={onDecrement}>
        <ChevronDown />
      </Button>
    </div>
  )
}

export const TimePicker = ({ value, onChange }: TimePickerProps) => {
  const {
    timeValues,
    formattedTime,
    paddedMinutes,
    handleHourChange,
    handleMinuteChange,
    handleMeridiemToggle,
  } = useTimePicker({ onChange, value })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex-center divide-x divide-border bg-muted border border-border rounded-lg cursor-pointer">
          <span className="py-1.5 px-3">
            <span className="font-normal text-sm text-black mr-6 tabular-nums">
              {formattedTime}
            </span>
          </span>
          <span className="px-3">
            <Clock className="size-4" />
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="py-7 px-8 w-59 rounded-2xl flex items-center justify-between"
      >
        <TimePickerUnit
          value={timeValues.hour12}
          onIncrement={() => handleHourChange("increment")}
          onDecrement={() => handleHourChange("decrement")}
        />
        <span className="font-medium text-base text-muted-foreground">:</span>
        <TimePickerUnit
          value={paddedMinutes}
          onIncrement={() => handleMinuteChange("increment")}
          onDecrement={() => handleMinuteChange("decrement")}
        />
        <span className="font-medium text-base text-muted-foreground">:</span>
        <TimePickerUnit
          value={timeValues?.meridiem}
          onIncrement={handleMeridiemToggle}
          onDecrement={handleMeridiemToggle}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
