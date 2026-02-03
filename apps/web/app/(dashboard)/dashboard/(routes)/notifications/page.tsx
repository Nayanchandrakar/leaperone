import { NotificationPanels } from "@/features/dashboard/components/pages/notifications/notification-panels"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function NotificationsPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Notifications</DashboardTitle>
      <NotificationPanels />
    </DashboardContainer>
  )
}
