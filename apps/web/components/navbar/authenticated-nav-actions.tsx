import type { User } from "@app/types"
import * as React from "react"
import { DashboardLinkButton } from "@/components/navbar/dashboard-link"
import { NavSettings } from "@/components/navbar/nav-settings"

type Props = {
  user: User
}

export const AuthenticatedNavActions = ({ user }: Props) => {
  return (
    <React.Fragment>
      <DashboardLinkButton />
      <NavSettings user={user} />
    </React.Fragment>
  )
}
