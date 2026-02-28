import {
  deleteCardSchema,
  getBusinessCardQuerySchema,
  saveBusinessCardSchema,
  toogleCardStatusSchema,
} from "@app/zod/schema/bussiness"
import type { BusinessService } from "@/features/business/service/business.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import { canManageBusinessCard } from "@/middlewares/business-card.middleware"
import { hasActiveSubscription, hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  DeleteCardContext,
  GetBusinessCardContext,
  SaveBusinessCardContext,
  ToogleCardStatusContext,
} from "@/types/bussiness.types"

export class BusinessController extends HttpController {
  constructor(private readonly businessService: BusinessService) {
    super("/business-card")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.get(
      "/",
      zodValidator("query", getBusinessCardQuerySchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.getBusinessCard,
    )

    this.router.patch(
      "/",
      zodValidator("json", saveBusinessCardSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      canManageBusinessCard,
      this.saveBusinessCard,
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
      "/",
      zodValidator("json", deleteCardSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.deleteBusinessCard,
    )
  }

  // Get Business Card
  getBusinessCard = async (c: GetBusinessCardContext) => {
    return await this.businessService.getBusinessCard(c)
  }

  // Save Business Card
  saveBusinessCard = async (c: SaveBusinessCardContext) => {
    return await this.businessService.saveBusinessCard(c)
  }

  // Delete Business Card
  deleteBusinessCard = async (c: DeleteCardContext) => {
    return await this.businessService.deleteBusinessCard(c)
  }

  // Toggle Business Card Status
  toggleBusinessCardStatus = async (c: ToogleCardStatusContext) => {
    return await this.businessService.toggleBusinessCardStatus(c)
  }
}
