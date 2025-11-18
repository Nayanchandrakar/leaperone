import { PanelContent, PanelItem, PanelTrigger } from "@app/ui/components/panel"
import { Switch } from "@app/ui/components/switch"
import { REPORT_OPTIONS } from "@/features/dashboard/constants/notifications/report-options"
import { NotificationDuration } from "./notification-duration"

interface FormSubmissionPanelProps {
  value: string
  onTrigger: (item: string) => void
  checkIsOpen: (key: string) => boolean
}

export const FormSubmissionPanel = ({
  checkIsOpen,
  onTrigger,
  value,
}: FormSubmissionPanelProps) => {
  const isOpen = checkIsOpen(value)

  return (
    <PanelItem open={isOpen}>
      <PanelTrigger>
        <div className="space-y-1 text-muted-foreground text-start">
          <p className="text-sm font-medium">Email me Scan Report of my card</p>
          <p className="text-xs font-normal">
            Receive scan reports to know how many times your digital business card was scanned
          </p>
        </div>

        <Switch checked={isOpen} onCheckedChange={() => onTrigger(value)} />
      </PanelTrigger>

      {/* Notification Duration */}
      <PanelContent>
        <NotificationDuration
          title="What type of Scan reports do you want?"
          defaultValue={REPORT_OPTIONS[0].value}
        />
      </PanelContent>
    </PanelItem>
  )
}
