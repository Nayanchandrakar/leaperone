import type { PermissionType, WorkspaceMember } from "@app/database/types"
import type { SubscriptionActive } from "@app/types"
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
    this.ctx.member = {
      id: "",
      userId: "",
      workspaceId: "",
      roleId: "",
    }
  }

  async checkSubscription() {
    this.ctx.subscription = {
      active: false,
      trial: false,
      seats: 0,
      expiresAt: null,
      cancelAtPeriodEnd: false,
      plan: null,
      priceId: null,
      customerId: null,
      subscriptionId: null,
    }
  }

  async checkPermissions(_permissions: Array<PermissionType>) {
    this.ctx.hasPermission = false
  }
  get context() {
    return this.ctx
  }
}
