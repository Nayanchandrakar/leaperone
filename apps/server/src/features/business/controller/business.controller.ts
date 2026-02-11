import {
  createBusinessCardSchema,
  deleteCardSchema,
  toogleCardStatusSchema,
} from "@app/zod/schema/bussiness"
import type { BusinessService } from "@/features/business/service/business.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import { canManageBusinessCard } from "@/middlewares/business-card.middleware"
import { hasActiveSubscription, hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  CreateBusinessCardContext,
  DeleteCardContext,
  GetBusinessCardContext,
  ToogleCardStatusContext,
  UpdateBusinessCardContext,
} from "@/types/bussiness.types"

export class BusinessController extends HttpController {
  constructor(private readonly businessService: BusinessService) {
    super("/business-card")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.get("/", isAuth, hasWorkspace, hasActiveSubscription, this.getBusinessCard)

    this.router.post(
      "/create",
      zodValidator("json", createBusinessCardSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      canManageBusinessCard,
      this.createBusinessCard,
    )

    this.router.put(
      "/edit",
      zodValidator("json", createBusinessCardSchema.partial()),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      canManageBusinessCard,
      this.updateBusinessCard,
    )

    this.router.put(
      "/status",
      zodValidator("json", toogleCardStatusSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.toggleBusinessCardStatus,
    )

    this.router.delete(
      "/delete",
      zodValidator("json", deleteCardSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.deleteBusinessCard,
    )
  }

  getBusinessCard = async (c: GetBusinessCardContext) => {
    return await this.businessService.getBusinessCard(c)
  }

  createBusinessCard = async (c: CreateBusinessCardContext) => {
    return await this.businessService.createBusinessCard(c)
  }

  updateBusinessCard = async (c: UpdateBusinessCardContext) => {
    return await this.businessService.updateBusinessCard(c)
  }

  deleteBusinessCard = async (c: DeleteCardContext) => {
    return await this.businessService.deleteBusinessCard(c)
  }

  toggleBusinessCardStatus = async (c: ToogleCardStatusContext) => {
    return await this.businessService.toggleBusinessCardStatus(c)
  }
}
