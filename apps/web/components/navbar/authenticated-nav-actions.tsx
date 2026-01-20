import * as React from "react"

import { DashboardLinkButton } from "@/components/navbar/dashboard-link"
import { NavSettings } from "@/components/navbar/nav-settings"
import type { User } from "@/types"

type Props = {
  user: User
}

export const AuthenticatedNavActions = async ({ user }: Props) => {
  return (
    <React.Fragment>
      <DashboardLinkButton workspaceId={""} />
      <NavSettings user={user} />
    </React.Fragment>
  )
}
