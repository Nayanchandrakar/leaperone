"use client"

import { Panel } from "@app/ui/components/panel"
import { CardScanPanel } from "@/features/dashboard/components/pages/notifications/card-scan-panel"
import { FormReportPanel } from "@/features/dashboard/components/pages/notifications/form-report-panel"
import { FormSubmissionPanel } from "@/features/dashboard/components/pages/notifications/form-submission-panel"
import { usePanel } from "@/hooks/global/use-panel"

export const NotificationPanels = () => {
  const { onTrigger, checkIsOpen } = usePanel({
    type: "multiple",
    collapsible: true,
    defaultOpen: ["card-scan", "form-submission", "form-report"],
  })

  return (
    <Panel className="max-w-3xl mt-8">
      <CardScanPanel checkIsOpen={checkIsOpen} onTrigger={onTrigger} value="card-scan" />
      <FormReportPanel checkIsOpen={checkIsOpen} onTrigger={onTrigger} value="form-report" />
      <FormSubmissionPanel
        checkIsOpen={checkIsOpen}
        onTrigger={onTrigger}
        value="form-submission"
      />
    </Panel>
  )
}
