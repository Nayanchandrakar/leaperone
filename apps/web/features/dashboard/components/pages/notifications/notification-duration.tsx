import { Label } from "@app/ui/components/label"
import { RadioGroup, RadioGroupItem } from "@app/ui/components/radio-group"
import { REPORT_OPTIONS } from "@/features/dashboard/constants/notifications/report-options"

interface NotificationDurationProps {
  title: string
  defaultValue: string
}

export const NotificationDuration = ({ title, defaultValue }: NotificationDurationProps) => {
  return (
    <div className="space-y-2">
      <p className="text-sm font-normal text-muted-foreground">{title}</p>

      <RadioGroup defaultValue={defaultValue} className="flex items-center gap-3 flex-wrap">
        {REPORT_OPTIONS.map(({ label, value }) => (
          <div className="flex items-center gap-2" key={value}>
            <RadioGroupItem value={value} id={value} />
            <Label htmlFor={value} className="font-normal text-muted-foreground text-sm">
              {label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
