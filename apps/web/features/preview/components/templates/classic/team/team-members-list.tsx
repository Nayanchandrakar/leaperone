import type { TeamMember } from "@app/core/types"
import { TeamMemberCard } from "@/features/preview/components/cards/classic/team-member-card"

interface TeamMemberListProps {
  members: TeamMember[]
  background: boolean
}

export const TeamMembersList = ({ members, background }: TeamMemberListProps) => {
  if (members?.length === 0) return null

  return members.map((member) => (
    <TeamMemberCard key={member.id} background={background} member={member} />
  ))
}
