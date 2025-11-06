"use client"

import { useQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import { getTeamInvitations } from "@/features/dashboard/actions/get-team-invitations"
import { DashboardSubtitle } from "@/features/dashboard/components/ui/dashboard-heading"
import {
  PromptAction,
  PromptMessage,
} from "@/features/dashboard/components/ui/feature-action-prompt"
import { InvitedMembersList } from "./invited-members-list"

export const TeamMemberInvitations = () => {
  const { data } = useQuery({
    queryKey: ["team-invitations"],
    queryFn: getTeamInvitations,
  })

  return (
    <section className="mt-8">
      <DashboardSubtitle>Your Team Members</DashboardSubtitle>
      <InvitedMembersList members={data!} />

      {data?.length === 0 && (
        <PromptMessage>
          Take full advantage of Leaper One by adding multiple members for your team!
        </PromptMessage>
      )}

      <PromptAction className="mt-8">
        <Plus className="size-4" />
        <span>Add Team Member</span>
      </PromptAction>
    </section>
  )
}
