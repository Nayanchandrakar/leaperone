import { db } from "@app/database"
import { getWorkspaceSettingsByWorkspaceId } from "@app/database/repository/workspace-settings"
import { ApiError } from "@app/error"
import type { Context, Next } from "hono"
import { MSG } from "@/constants/message"
import type { HonoEnv } from "@/types/global.types"

export const canManageBusinessCard = async (c: Context<HonoEnv>, next: Next) => {
  const { session } = c.get("session")
  const workspace = c.get("workspace")

  // If user is being impersonated by a manager, allow management
  if (session?.impersonatedBy === workspace.ownerId) {
    return await next()
  }

  // For regular members, check workspace settings
  const workspaceSettings = await getWorkspaceSettingsByWorkspaceId(db, workspace.id)

  if (!workspaceSettings || !workspaceSettings.createAndEdit) {
    throw ApiError.forbidden(MSG.BUSINESS_CARD.PERMISSION_DENIED)
  }

  return await next()
}
