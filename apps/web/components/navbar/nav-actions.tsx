import type { User } from "@app/types"
import { AuthenticatedNavActions } from "@/components/navbar/authenticated-nav-actions"
import { UnauthenticatedNavActions } from "@/components/navbar/unauthenticated-nav-actions"

type Props = {
  user: User
}

export const NavActions = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-3.5">
      {user ? <AuthenticatedNavActions user={user} /> : <UnauthenticatedNavActions />}
    </div>
  )
}
