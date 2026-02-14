import { db } from "@app/database"
import { getWorkspaceStats } from "@app/database/repository/workspace"
import {
  getWorkspaceSettingsByWorkspaceId,
  updateWorkspaceSettingsByWorkspaceId,
} from "@app/database/repository/workspace-settings"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type {
  GetWorkspaceSettingsCtx,
  GetWorkspaceStatsCtx,
  UpdateWorkspaceSettingsCtx,
} from "@/types/workspace.types"

export class WorkspaceService {
  async getWorkspaceSettings(c: GetWorkspaceSettingsCtx) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")

    const isOwner = workspace.ownerId === user.id

    if (!isOwner) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const workspaceSettings = await getWorkspaceSettingsByWorkspaceId(db, workspace.id)

    if (!workspaceSettings) {
      throw ApiError.notFound(MSG.WORKSPACE.NOT_FOUND)
    }

    return c.json({ createAndEdit: workspaceSettings.createAndEdit })
  }

  async getWorkspaceStats(c: GetWorkspaceStatsCtx) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const subscription = c.get("subscription")

    const overview = await getWorkspaceStats(db, workspace.id, user.id)

    if (!overview) {
      throw ApiError.notFound(MSG.ANALYTICS.OVERVIEW_NOT_FOUND)
    }

    const isOwner = workspace.ownerId === user.id
    overview.seatsUsed = isOwner ? overview.seatsUsed : 1
    subscription.seats = isOwner ? subscription.seats : 1

    return c.json({
      seatsUsed: overview.seatsUsed,
      totalSeats: subscription.seats,
      totalClicks: overview.totalClicks,
      currentMonthClicks: overview.monthlyClicks,
      formsSubmitted: 0, // Placeholder; update implementation if/when supported
    })
  }

  async updateWorkspaceSettings(c: UpdateWorkspaceSettingsCtx) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { createAndEdit } = c.req.valid("json")

    const isOwner = workspace.ownerId === user.id

    if (!isOwner) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const updated = await updateWorkspaceSettingsByWorkspaceId(db, workspace.id, { createAndEdit })

    if (!updated) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    return c.json({ message: MSG.GENERAL.SUCCESS })
  }
}
