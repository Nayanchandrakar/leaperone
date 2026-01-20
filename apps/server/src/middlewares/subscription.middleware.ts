import { db } from "@app/database"
import { getWorkspaceWithSubscription } from "@app/database/repository/subscription"
import { countWorkspaceMembers } from "@app/database/repository/workspace-member"
import { ApiError } from "@app/error"
import type { Context, Next } from "hono"
import { MSG } from "@/constants/message"
import type { HonoEnv } from "@/types/global.types"

export async function hasWorkspace(c: Context<HonoEnv>, next: Next) {
  const session = c.get("session")
  const { workspace, subscription } = await getWorkspaceWithSubscription(db, session.user.id)

  if (!workspace) throw ApiError.badRequest(MSG.WORKSPACE.NOT_FOUND)

  // Set workspace and subscription in context
  c.set("workspace", workspace)
  c.set("subscription", subscription)

  return await next()
}

export async function hasActiveSubscription(c: Context<HonoEnv>, next: Next) {
  const subscription = c.get("subscription")
  if (!subscription.active) throw ApiError.forbidden(MSG.SUBSCRIPTION.SUBSCRIPTION_NOT_ACTIVE)
  return await next()
}

export async function hasTeamPlanWithSeats(c: Context<HonoEnv>, next: Next) {
  const workspace = c.get("workspace")
  const subscription = c.get("subscription")

  // Check if user has team plan
  if (subscription.plan !== "team") {
    throw ApiError.forbidden(MSG.SUBSCRIPTION.TEAM_PLAN_REQUIRED)
  }

  // Check if workspace has enough seats available
  const membersCount = await countWorkspaceMembers(db, workspace.id)
  if (membersCount >= subscription.seats) {
    throw ApiError.forbidden(MSG.SUBSCRIPTION.NOT_ENOUGH_SEATS)
  }

  return await next()
}

export async function hasTeamPlan(c: Context<HonoEnv>, next: Next) {
  const subscription = c.get("subscription")

  if (subscription.plan !== "team") {
    throw ApiError.forbidden(MSG.SUBSCRIPTION.TEAM_PLAN_REQUIRED)
  }

  return await next()
}
