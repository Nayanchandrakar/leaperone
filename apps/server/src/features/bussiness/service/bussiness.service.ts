import { db } from "@app/database"
import {
  createBusinessCard,
  getBusinessCardByWorkspaceId,
  updateBusinessCardById,
} from "@app/database/repository/business-card"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type { CreateBusinessCardContext, UpdateBusinessCardContext } from "@/types/bussiness.types"

export class BussinessService {
  async createBusinessCard(c: CreateBusinessCardContext) {
    const session = c.get("session")
    const workspace = c.get("workspace")
    const values = c.req.valid("json")

    const existingCard = await getBusinessCardByWorkspaceId(db, workspace.id)

    if (existingCard) {
      throw ApiError.badRequest(MSG.BUSINESS_CARD.ALREADY_EXISTS)
    }

    const businessCard = await createBusinessCard(db, {
      qrCode: values.qrCode,
      design: values.design,
      content: values.content,
      template: values.template,
      workspaceId: workspace.id,
      userId: session.user.id,
    })

    return c.json({
      data: businessCard,
      message: MSG.BUSINESS_CARD.CREATED_SUCCESS,
    })
  }

  async updateBusinessCard(c: UpdateBusinessCardContext) {
    const workspace = c.get("workspace")
    const values = c.req.valid("json")

    const existingCard = await getBusinessCardByWorkspaceId(db, workspace.id)

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
      throw ApiError.badRequest(MSG.USER.FAILED_TO_UPDATE)
    }

    return c.json({
      data: updated,
      message: MSG.BUSINESS_CARD.UPDATED_SUCCESS,
    })
  }
}
