import { db } from "@app/database"
import {
  createBusinessCard,
  deleteBusinessCardWithPermission,
  getCardByWorkspaceIdAndUserId,
  getCardIdByWorkspaceIdAndUserId,
  updateBusinessCardById,
} from "@app/database/repository/business-card"
import type { BusinessCardStatus } from "@app/database/types"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type {
  CreateBusinessCardContext,
  DeleteCardContext,
  GetBusinessCardContext,
  ToogleCardStatusContext,
  UpdateBusinessCardContext,
} from "@/types/bussiness.types"

export class BusinessService {
  async getBusinessCard(c: GetBusinessCardContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const card = await getCardByWorkspaceIdAndUserId(db, workspace.id, user.id)
    return c.json({ card })
  }

  async createBusinessCard(c: CreateBusinessCardContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const values = c.req.valid("json")

    const existingCard = await getCardIdByWorkspaceIdAndUserId(db, workspace.id, user.id)

    if (existingCard) {
      throw ApiError.badRequest(MSG.BUSINESS_CARD.ALREADY_EXISTS)
    }

    const businessCard = await createBusinessCard(db, {
      status: "active",
      userId: user.id,
      qrCode: values.qrCode,
      design: values.design,
      content: values.content,
      template: values.template,
      workspaceId: workspace.id,
      identifier: user.username, // By default, the identifier is the username of the user
    })

    if (!businessCard) {
      throw ApiError.badRequest(MSG.BUSINESS_CARD.FAILED_TO_CREATE)
    }

    return c.json({
      data: businessCard,
      message: MSG.BUSINESS_CARD.CREATED_SUCCESS,
    })
  }

  async updateBusinessCard(c: UpdateBusinessCardContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const values = c.req.valid("json")

    const existingCard = await getCardIdByWorkspaceIdAndUserId(db, workspace.id, user.id)

    if (!existingCard) {
      throw ApiError.notFound(MSG.BUSINESS_CARD.NOT_FOUND)
    }

    const updated = await updateBusinessCardById(db, existingCard.id, {
      ...(values?.template && { template: values.template }),
      ...(values?.content && { content: values.content }),
      ...(values?.design && { design: values.design }),
      ...(values.qrCode && { qrCode: values.qrCode }),
    })

    if (!updated) {
      throw ApiError.badRequest(MSG.BUSINESS_CARD.FAILED_TO_UPDATE)
    }

    return c.json({
      data: updated,
      message: MSG.BUSINESS_CARD.UPDATED_SUCCESS,
    })
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
