"use client"

import { TeamPermissionCard } from "@/features/dashboard/components/cards/team-settings/team-permission-card"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"
import { useTeamSettings } from "@/features/dashboard/hooks/team-settings/use-team-settings"

export default function TeamSettingsPage() {
  const { data } = useTeamSettings()

  return (
    <DashboardContainer>
      <DashboardTitle>Team Settings</DashboardTitle>

      <TeamPermissionCard
        className="max-w-4xl mt-8"
        onCheckedChange={() => {}}
        checked={!!data?.createAndEdit}
        title="Digital business card creating & editing"
        description="Allow invited team members to create and edit their digital business card"
      />
    </DashboardContainer>
  )
}
