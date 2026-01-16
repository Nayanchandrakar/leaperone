import { dbHttp } from "@app/database/adapters/http"
import { getLatestWorkspaceIdByUserId } from "@app/database/repository/workspace"
import * as React from "react"

import { DashboardLinkButton } from "@/components/navbar/dashboard-link"
import { NavSettings } from "@/components/navbar/nav-settings"
import type { User } from "@/types"

type Props = {
  user: User
}

export const AuthenticatedNavActions = async ({ user }: Props) => {
  const workspace = await getLatestWorkspaceIdByUserId(dbHttp, user.id)

  return (
    <React.Fragment>
      <DashboardLinkButton workspaceId={workspace?.id!} />
      <NavSettings user={user} />
    </React.Fragment>
  )
}
