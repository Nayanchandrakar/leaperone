import { hasPermissions } from "@app/database/repository/role-permission"
import { getWorkspaceById, updateWorkspaceById } from "@app/database/repository/workspace"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type { GetCardSettingsCtx, UpdateCardSettingCtx } from "@/types/workspace.types"

export class WorkspaceService {
  async getCardSettings(c: GetCardSettingsCtx) {
    const session = c.get("session")
    const { user } = session
    const workspace = c.get("workspace")

    const canManage = await hasPermissions(user.id, workspace.id, ["manage:members"], session)

    if (!canManage) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const workspaceData = await getWorkspaceById(workspace.id)

    if (!workspaceData) {
      throw ApiError.notFound(MSG.WORKSPACE.NOT_FOUND)
    }

    return c.json({
      data: {
        createAndEdit: workspaceData.createAndEdit,
      },
    })
  }

  async updateCardSetting(c: UpdateCardSettingCtx) {
    const session = c.get("session")
    const { user } = session
    const workspace = c.get("workspace")
    const { createAndEdit } = c.req.valid("json")

    const canManage = await hasPermissions(user.id, workspace.id, ["manage:members"], session)

    if (!canManage) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const updated = await updateWorkspaceById(workspace.id, { createAndEdit })

    if (!updated) {
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    return c.json({ data: { createAndEdit } })
  }
}
