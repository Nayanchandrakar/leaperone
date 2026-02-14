"use client"

import { TeamPermissionCard } from "@/features/dashboard/components/cards/team-settings/team-permission-card"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import { DashboardTitle } from "@/features/dashboard/components/ui/dashboard-heading"
import {
  useUpdateWorkspaceSettings,
  useWorkspaceSettings,
} from "@/features/dashboard/hooks/team-settings/use-workspace-settings"

export default function TeamSettingsPage() {
  const { data, isPending, isError } = useWorkspaceSettings()
  const { mutate } = useUpdateWorkspaceSettings()

  return (
    <DashboardContainer>
      <DashboardTitle>Team Settings</DashboardTitle>
      <TeamPermissionCard
        className="max-w-4xl mt-8"
        checked={data?.createAndEdit}
        disabled={isPending || isError}
        title="Digital business card creating & editing"
        onCheckedChange={(createAndEdit) => mutate({ createAndEdit })}
        description="Allow invited team members to create and edit their digital business card"
      />
    </DashboardContainer>
  )
}
