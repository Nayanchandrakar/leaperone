import { Plus } from "lucide-react"
import { DashboardSubtitle } from "@/features/dashboard/components/ui/dashboard-heading"
import {
  PromptAction,
  PromptMessage,
} from "@/features/dashboard/components/ui/feature-action-prompt"

export const TeamMemberInvitations = () => {
  return (
    <section className="mt-8">
      <DashboardSubtitle>Your Team Members</DashboardSubtitle>
      <PromptMessage>
        Take full advantage of Leaper One by adding multiple members for your
        team!
      </PromptMessage>
      <PromptAction>
        <Plus className="size-4" />
        <span>Add Team Member</span>
      </PromptAction>
    </section>
  )
}
