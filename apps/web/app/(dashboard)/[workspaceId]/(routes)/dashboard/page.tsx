import { hasPermissions } from "@app/database/repository/role-permission"
import { isMemberOfWorkspace } from "@app/database/repository/workspace-member"
import { redirect } from "next/navigation"
import { getSession } from "@/actions/global/get-session"

type IDashboardPage = {
  params: Promise<{ workspaceId: string }>
}

export default async function DashboardPage({ params }: IDashboardPage) {
  const [session, { workspaceId }] = await Promise.all([getSession(), params])

  if (!session) redirect("/login")

  const workspaceMembers = await isMemberOfWorkspace(
    session.user.id,
    workspaceId,
  )

  if (!workspaceMembers) redirect("/not-found")

  const canAccess = await hasPermissions(
    session.user.id,
    workspaceMembers.roleId,
    ["manage:members"],
  )

  if (!canAccess) redirect("/some-error-page")

  return <div className="">Dashboard page {workspaceId}</div>
}
