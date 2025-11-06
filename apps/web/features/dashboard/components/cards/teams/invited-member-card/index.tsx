import { TableRow } from "@app/ui/components/table"
import { InvitedMemberActions } from "@/features/dashboard/components/cards/teams/invited-member-card/invited-member-actions"
import { InvitedMemberProfile } from "@/features/dashboard/components/cards/teams/invited-member-card/invited-member-profile"

interface MemberDataCardProps {
  name: string
  role: string
  status: string
  avatarUrl: string
  id: string
}

export const MemberDataCard = ({ name, role, status, avatarUrl, id }: MemberDataCardProps) => {
  return (
    <TableRow key={id}>
      <InvitedMemberProfile name={name} role={role} status={status} avatarUrl={avatarUrl} />
      <InvitedMemberActions />
    </TableRow>
  )
}
