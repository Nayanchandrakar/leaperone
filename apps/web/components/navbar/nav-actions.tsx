import type { User } from "@app/types"
import { AuthenticatedNavActions } from "@/components/navbar/authenticated-nav-actions"
import { UnauthenticatedNavActions } from "@/components/navbar/unauthenticated-nav-actions"

interface NavActionsProps {
  user: User
}

export function NavActions({ user }: NavActionsProps) {
  return (
    <div className="flex items-center gap-3.5">
      {user ? <AuthenticatedNavActions user={user} /> : <UnauthenticatedNavActions />}
    </div>
  )
}
