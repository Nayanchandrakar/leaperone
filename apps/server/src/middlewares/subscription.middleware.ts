import { db } from "@app/database"
import {
  getSubscriptionByWorkspaceId,
  isSubscriptionActive,
} from "@app/database/repository/subscription"
import { getWorkspaceByUserId } from "@app/database/repository/workspace"
import { ApiError } from "@app/error"
import type { Context, Next } from "hono"
import { MSG } from "@/constants/message"
import type { HonoEnv } from "@/types/global.types"

export const hasWorkspace = async (c: Context<HonoEnv>, next: Next) => {
  const session = c.get("session")
  const workspace = await getWorkspaceByUserId(db, session.user.id)
  if (!workspace) throw ApiError.badRequest(MSG.WORKSPACE.NOT_FOUND)
  c.set("workspace", workspace)
  await next()
}

export const hasActiveSubscription = async (c: Context<HonoEnv>, next: Next) => {
  const workspace = c.get("workspace")
  const { active } = await isSubscriptionActive(db, workspace.id)
  if (!active) throw ApiError.forbidden(MSG.SUBSCRIPTION.SUBSCRIPTION_NOT_ACTIVE)
  await next()
}

export const canInviteMembers = async (c: Context<HonoEnv>, next: Next) => {
  const workspace = c.get("workspace")
  const subscription = await getSubscriptionByWorkspaceId(db, workspace.id)

  // Individual plans cannot invite team members
  if (subscription?.plan === "individual") {
    throw ApiError.forbidden(
      "Individual plans cannot invite team members. Please upgrade to a Team plan to unlock team collaboration features.",
    )
  }

  await next()
}
