import { db } from "@app/database"
import { hasPermissions } from "@app/database/repository/role-permission"
import {
  getWorkspaceSettingsByWorkspaceId,
  updateWorkspaceSettingsByWorkspaceId,
} from "@app/database/repository/workspace-settings"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type { GetCardSettingsCtx, UpdateCardSettingCtx } from "@/types/workspace.types"

export class WorkspaceService {
  async getCardSettings(c: GetCardSettingsCtx) {
    const session = c.get("session")
    const { user } = session
    const workspace = c.get("workspace")

    const canManage = await hasPermissions(db, user.id, ["manage:members"])

    if (!canManage) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const workspaceSettings = await getWorkspaceSettingsByWorkspaceId(db, workspace.id)

    if (!workspaceSettings) {
      throw ApiError.notFound(MSG.WORKSPACE.NOT_FOUND)
    }

    return c.json({
      data: {
        createAndEdit: workspaceSettings.createAndEdit,
      },
    })
  }

  async updateCardSetting(c: UpdateCardSettingCtx) {
    const session = c.get("session")
    const { user } = session
    const workspace = c.get("workspace")
    const { createAndEdit } = c.req.valid("json")

    const canManage = await hasPermissions(db, user.id, ["manage:members"])

    if (!canManage) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const updated = await updateWorkspaceSettingsByWorkspaceId(db, workspace.id, { createAndEdit })

    if (!updated) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    return c.json({ data: { createAndEdit } })
  }
}
