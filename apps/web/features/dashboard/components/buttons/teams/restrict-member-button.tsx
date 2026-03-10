import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import { Lock, Unlock } from "lucide-react"
import { useRestrictUser } from "@/features/dashboard/hooks/teams/use-restrict-user"

type RestrictMemberButtonProps = {
  memberId: string
  isRestricted: boolean
}

export function RestrictMemberButton({ memberId, isRestricted }: RestrictMemberButtonProps) {
  const { mutate, isPending } = useRestrictUser()

  return (
    <DropdownMenuItem
      disabled={isPending}
      onClick={() => mutate({ memberId, restrict: !isRestricted })}
    >
      {isRestricted ? (
        <>
          <Unlock />
          Enable Account
        </>
      ) : (
        <>
          <Lock />
          Disable Account
        </>
      )}
    </DropdownMenuItem>
  )
}
