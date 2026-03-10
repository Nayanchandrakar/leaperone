import type { User } from "@app/types"
import { DashboardLinkButton } from "@/components/navbar/dashboard-link"
import { NavSettings } from "@/components/navbar/nav-settings"

interface AuthenticatedNavActionsProps {
  user: User
}

export function AuthenticatedNavActions({ user }: AuthenticatedNavActionsProps) {
  return (
    <>
      <DashboardLinkButton />
      <NavSettings user={user} />
    </>
  )
}
