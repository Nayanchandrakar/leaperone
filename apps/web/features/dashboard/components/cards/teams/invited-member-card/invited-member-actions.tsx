import { TableCell } from "@app/ui/components/table"
import { AccessAsMemberButton } from "@/features/dashboard/components/buttons/teams/access-as-member-button"
import { RestrictMemberButton } from "@/features/dashboard/components/buttons/teams/restrict-member-button"
import { BussinessCardMenu } from "@/features/dashboard/components/menu/bussiness-card-menu"
import { MemberDeleteMenu } from "@/features/dashboard/components/menu/member-delete-menu"

export const InvitedMemberActions = () => {
  return (
    <TableCell>
      <div className="flex gap-3 flex-wrap">
        <AccessAsMemberButton />
        <RestrictMemberButton />
        <BussinessCardMenu />
        <MemberDeleteMenu />
      </div>
    </TableCell>
  )
}
