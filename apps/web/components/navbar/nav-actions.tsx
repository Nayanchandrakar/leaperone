import { AuthenticatedNavActions } from "@/components/navbar/authenticated-nav-actions"
import { UnauthenticatedNavActions } from "@/components/navbar/unauthenticated-nav-actions"
import type { FullSession } from "@/types"

type NavActionProps = {
  session: FullSession | null
}

export const NavActions = ({ session }: NavActionProps) => {
  return (
    <div className="flex items-center gap-4">
      {session ? (
        <AuthenticatedNavActions session={session} />
      ) : (
        <UnauthenticatedNavActions />
      )}
    </div>
  )
}
