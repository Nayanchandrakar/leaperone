import { createBusinessCardSchema } from "@app/zod/schema/bussiness"
import type { BussinessService } from "@/features/bussiness/service/bussiness.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import { canManageBusinessCard } from "@/middlewares/business-card.middleware"
import { hasActiveSubscription, hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { CreateBusinessCardContext, UpdateBusinessCardContext } from "@/types/bussiness.types"

export class BussinessController extends HttpController {
  constructor(private readonly bussinessService: BussinessService) {
    super("/bussiness-card")
    this.initializeRoutes()
  }

  protected override initializeRoutes(): void {
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
  }

  createBusinessCard = async (c: CreateBusinessCardContext) => {
    return await this.bussinessService.createBusinessCard(c)
  }

  updateBusinessCard = async (c: UpdateBusinessCardContext) => {
    return await this.bussinessService.updateBusinessCard(c)
  }
}
