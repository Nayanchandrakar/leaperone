import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import { UserCircle } from "lucide-react"
import { useImpersonateMember } from "@/features/dashboard/hooks/teams/use-impersonate-member"

interface AccessAsMemberButtonProps {
  memberId: string
  isRestricted: boolean
}

export const AccessAsMemberButton = ({ memberId, isRestricted }: AccessAsMemberButtonProps) => {
  const { mutate, isPending } = useImpersonateMember()

  return (
    <DropdownMenuItem onClick={() => mutate({ memberId })} disabled={isPending || isRestricted}>
      <UserCircle />
      Access as Member
    </DropdownMenuItem>
  )
}
