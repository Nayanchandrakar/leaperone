import { db } from "@app/database"
import { getWorkspaceWithSubscription } from "@app/database/repository/subscription"
import { ApiError } from "@app/error"
import type { Context, Next } from "hono"
import { MSG } from "@/constants/message"
import type { HonoEnv } from "@/types/global.types"

export const hasWorkspace = async (c: Context<HonoEnv>, next: Next) => {
  const session = c.get("session")
  const { workspace, subscription } = await getWorkspaceWithSubscription(db, session.user.id)

  if (!workspace) throw ApiError.badRequest(MSG.WORKSPACE.NOT_FOUND)

  // Set workspace and subscription in context
  c.set("workspace", workspace)
  c.set("subscription", subscription)

  return await next()
}

export const hasActiveSubscription = async (c: Context<HonoEnv>, next: Next) => {
  const subscription = c.get("subscription")
  if (!subscription.active) throw ApiError.forbidden(MSG.SUBSCRIPTION.SUBSCRIPTION_NOT_ACTIVE)
  return await next()
}
