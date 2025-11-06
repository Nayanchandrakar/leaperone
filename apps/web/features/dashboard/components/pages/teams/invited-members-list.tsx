import { Table, TableBody, TableHead, TableHeader, TableRow } from "@app/ui/components/table"
import { MemberDataCard } from "@/features/dashboard/components/cards/teams/invited-member-card"

interface RenderInvitedMembersProps {
  members: {
    id: string
    name: string
    role: string
    status: string
    avatarUrl: string
  }[]
}

export const InvitedMembersList = ({ members }: RenderInvitedMembersProps) => {
  return (
    <div className="w-full border rounded-xl overflow-hidden mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-80 font-medium text-sm text-gray-600">Member Details</TableHead>
            <TableHead className="font-medium text-sm text-gray-600">Actions for Member</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {members.map(({ avatarUrl, name, role, status, id }) => (
            <MemberDataCard
              key={id}
              name={name}
              role={role}
              status={status}
              avatarUrl={avatarUrl}
              id={id}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
