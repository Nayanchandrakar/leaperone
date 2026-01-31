import { db } from "@app/database"
import {
  createBusinessCard,
  getCardByWorkspaceIdAndUserId,
  getCardIdByWorkspaceIdAndUserId,
  updateBusinessCardById,
} from "@app/database/repository/business-card"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type {
  CreateBusinessCardContext,
  GetBusinessCardContext,
  UpdateBusinessCardContext,
} from "@/types/bussiness.types"

export class BusinessService {
  async getBusinessCard(c: GetBusinessCardContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const card = await getCardByWorkspaceIdAndUserId(db, workspace.id, user.id)
    return c.json({ data: card })
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
}
