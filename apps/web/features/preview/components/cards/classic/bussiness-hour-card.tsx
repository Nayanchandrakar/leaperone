import type { Period } from "@app/core/types"
import { useMemo } from "react"
import { formatTime } from "@/features/preview/utils/format-time"

export const BussinessHourCard = ({ end, label, start }: Period) => {
  const labelContent = useMemo(() => (label ? label : null), [label])

  return (
    <div className="flex items-center gap-2 justify-between py-4 only:py-0 border-b last:border-none">
      {labelContent && (
        <p className="truncate font-medium text-sm text-template-muted-foreground">
          {labelContent}
        </p>
      )}
      <p className="font-template-body text-sm text-template-muted-foreground shrink-0">
        {formatTime(start)} - {formatTime(end)}
      </p>
    </div>
  )
}
