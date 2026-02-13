import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import { UserCircle } from "lucide-react"
import { useImpersonateMember } from "@/features/dashboard/hooks/teams/use-impersonate-member"

interface ImpersonationButtonProps {
  memberId: string
  isRestricted: boolean
}

export const ImpersonationButton = ({ memberId, isRestricted }: ImpersonationButtonProps) => {
  const { mutate, isPending } = useImpersonateMember()

  return (
    <DropdownMenuItem
      disabled={isPending || isRestricted}
      onClick={() => mutate({ memberId, path: "/dashboard" })}
    >
      <UserCircle />
      Access as Member
    </DropdownMenuItem>
  )
}
