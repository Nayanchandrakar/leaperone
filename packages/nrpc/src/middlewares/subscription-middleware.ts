import { isSubscriptionActive } from "@app/core/utils"
import { getWorkspaceByOwnerId } from "@app/database/repository/workspace"
import { ApiError } from "@app/error"
import type { Context, Next } from "hono"
import { createMiddleware } from "hono/factory"
import { MSG } from "../constants/message"
import type { HonoEnv } from "../types"

export const hasWorkspace = createMiddleware<HonoEnv>(
  async (c: Context<HonoEnv>, next: Next) => {
    const session = c.get("session")
    const workspace = await getWorkspaceByOwnerId(session.user.id)
    if (!workspace) throw ApiError.badRequest(MSG.WORKSPACE.NOT_FOUND)
    c.set("workspace", workspace)
    await next()
  },
)

export const hasActiveSubscription = createMiddleware<HonoEnv>(
  async (c: Context<HonoEnv>, next: Next) => {
    const workspace = c.get("workspace")
    const { active } = await isSubscriptionActive(workspace.id)
    if (active) await next()

    throw ApiError.forbidden(MSG.SUBSCRIPTION.SUBSCRIPTION_NOT_ACTIVE)
  },
)
