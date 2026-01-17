import { isSubscriptionActive } from "@app/core/utils"
import { dbHttp } from "@app/database/adapters/http"
import { hasPermissions } from "@app/database/repository/role-permission"
import { isMemberOfWorkspace } from "@app/database/repository/workspace-member"
import type { PermissionType, WorkspaceMember } from "@app/database/types"
import type { SubscriptionActive } from "@app/types"
import { redirect } from "next/navigation"
import { handleAuth } from "@/actions/utils"
import type { FullSession } from "@/types"

type DashboardContext = {
  session: FullSession
  param: Record<string, string>
  member?: Omit<WorkspaceMember, "joinedAt" | "createdAt" | "updatedAt">
  subscription?: SubscriptionActive
  hasPermission?: boolean
}

export class DashboardPipeline {
  private ctx: DashboardContext

  constructor(param: Record<string, string>, session: FullSession) {
    this.ctx = { param, session }
  }

  static async init(params: Promise<Record<string, string>>) {
    const [param, session] = await Promise.all([params, handleAuth({ mode: "require" })])
    return new DashboardPipeline(param, session)
  }

  async checkMembership() {
    const member = await isMemberOfWorkspace(
      dbHttp,
      this.ctx.session.user.id,
      this.ctx.param.workspaceId!,
    )
    if (!member) redirect("/not-found")
    this.ctx.member = member
  }

  async checkSubscription() {
    const subscription = await isSubscriptionActive(dbHttp, this.ctx.param.workspaceId!)
    if (!subscription) redirect("/not-found")
    this.ctx.subscription = subscription
  }

  async checkPermissions(permissions: Array<PermissionType>) {
    const hasPermission = await hasPermissions(
      dbHttp,
      this.ctx.session.user.id,
      this.ctx.member?.workspaceId!,
      permissions,
    )
    if (!hasPermission) redirect("/not-found")
    this.ctx.hasPermission = hasPermission
  }

  get context() {
    return this.ctx
  }
}
