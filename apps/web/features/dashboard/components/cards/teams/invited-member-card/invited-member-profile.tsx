import { Skeleton } from "@app/ui/components/skeleton"
import { TableCell } from "@app/ui/components/table"
import { MemberStatusIndicator } from "@/features/dashboard/components/ui/member-status-indicator"

interface InvitedMemberProfileProps {
  name: string
  role: string
  status: string
  avatarUrl: string
}

export const InvitedMemberProfile = ({ name, role }: InvitedMemberProfileProps) => {
  return (
    <TableCell>
      <div className="font-medium flex items-center gap-4">
        {/* Avatar */}
        <Skeleton className="size-11 rounded-full " />

        {/* Name and Role */}
        <div className="flex flex-col gap-1">
          {/* Name */}
          <div className="flex items-center gap-1.5">
            <p className="font-medium text-base text-gray-600">{name}</p>
            <MemberStatusIndicator className="bg-green-500" />
          </div>

          {/* Role */}
          <p className="text-zinc-500 font-normal text-sm">{role}</p>
        </div>
      </div>
    </TableCell>
  )
}
