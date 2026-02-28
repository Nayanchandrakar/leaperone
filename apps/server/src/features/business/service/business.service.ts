import { db } from "@app/database"
import {
  createBusinessCard,
  deleteBusinessCardWithPermission,
  getCardByWorkspaceIdAndUserId,
  getCardIdByWorkspaceIdAndUserId,
  saveBusinessCard,
  updateBusinessCardById,
} from "@app/database/repository/business-card"
import type { BusinessCardStatus } from "@app/database/types"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type {
  DeleteCardContext,
  GetBusinessCardContext,
  SaveBusinessCardContext,
  ToogleCardStatusContext,
} from "@/types/bussiness.types"

export class BusinessService {
  async getBusinessCard(c: GetBusinessCardContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { withCard } = c.req.valid("query")

    const card = await getCardByWorkspaceIdAndUserId(db, workspace.id, user.id, withCard)
    return c.json({ card })
  }

  async saveBusinessCard(c: SaveBusinessCardContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { content, design, qrCode, template, isEdit } = c.req.valid("json")

    const card = await (isEdit ? saveBusinessCard : createBusinessCard)(db, {
      qrCode,
      design,
      content,
      template,
      userId: user.id,
      workspaceId: workspace.id,
      identifier: user.username, // By default, the identifier is the username of the user
    })

    if (!card) {
      throw ApiError.badRequest(MSG.BUSINESS_CARD.FAILED_TO_CREATE)
    }

    return c.json({ card })
  }

  async deleteBusinessCard(c: DeleteCardContext) {
    const { user } = c.get("session")
    const { id } = c.req.valid("json")
    const workspace = c.get("workspace")

    const deleted = await deleteBusinessCardWithPermission(
      db,
      user.id,
      workspace.id,
      workspace.ownerId,
      id,
    )

    if (!deleted) {
      throw ApiError.notFound(MSG.BUSINESS_CARD.NOT_FOUND)
    }

    return c.json({ message: MSG.BUSINESS_CARD.DELETED_SUCCESS })
  }

  async toggleBusinessCardStatus(c: ToogleCardStatusContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { id, status } = c.req.valid("json")

    const existingCard = await getCardIdByWorkspaceIdAndUserId(db, workspace.id, user.id)

    if (!existingCard) {
      throw ApiError.notFound(MSG.BUSINESS_CARD.NOT_FOUND)
    }

    const toggled = await updateBusinessCardById(db, id, { status })

    if (!toggled) {
      throw ApiError.badRequest(MSG.BUSINESS_CARD.FAILED_TO_TOGGLE_STATUS)
    }

    const message: Record<BusinessCardStatus, string> = {
      active: MSG.BUSINESS_CARD.ACTIVATED_SUCCESS,
      inactive: MSG.BUSINESS_CARD.DEACTIVATED_SUCCESS,
    }

    return c.json({ message: message[status] })
  }
}
