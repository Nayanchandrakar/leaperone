import { Button } from "@app/ui/components/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { ChevronDown, ChevronUp, Clock } from "lucide-react"
import { useTimePicker } from "@/features/bussiness/hooks/home/use-time-picker"
import { formatTime } from "@/features/preview/utils/format-time"

type TimePickerProps = {
  value: Date
  onChange: (newTime: Date) => void
}

type TimePickerUnitProps = {
  value: string | number
  onIncrement: () => void
  onDecrement: () => void
}

export function TimePickerUnit({ value, onIncrement, onDecrement }: TimePickerUnitProps) {
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
    hour12,
    meridiem,
    paddedMinutes,
    handleHourChange,
    handleMinuteChange,
    handleMeridiemToggle,
  } = useTimePicker({ onChange, value })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex shrink-0 divide-x divide-input bg-muted border border-input rounded-lg cursor-pointer [&_span]:px-3 [&_span]:py-2">
        <span className="flex items-center w-full">
          <p className="font-normal text-sm tabular-nums">{formatTime(value)}</p>
        </span>
        <span className="flex-center">
          <Clock className="size-4" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="py-7 px-8 w-59 rounded-2xl flex items-center justify-between"
      >
        <TimePickerUnit
          value={hour12}
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
          value={meridiem}
          onIncrement={handleMeridiemToggle}
          onDecrement={handleMeridiemToggle}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
