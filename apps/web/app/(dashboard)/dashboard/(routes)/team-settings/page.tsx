import { TeamSettings } from "@/features/dashboard/components/pages/team-settings/team-settings"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"

export default function TeamSettingsPage() {
  return (
    <DashboardContainer>
      <DashboardTitle>Team Settings</DashboardTitle>
      <TeamSettings />
    </DashboardContainer>
  )
}
