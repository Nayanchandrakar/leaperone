import { checkoutSessionSchema } from "@app/zod/schema/subscription"
import { HttpController } from "@/features/shared/controllers/http.controller"
import type { SubscriptionService } from "@/features/subscription/services/subscription.service"
import { isAuth } from "@/middlewares/auth.middleware"
import { hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { CheckoutSessionContext, StripeContext } from "@/types/subscription.types"

export class SubscriptionController extends HttpController {
  constructor(private readonly subscriptionService: SubscriptionService) {
    super("/subscription")
  }

  protected override initializeRoutes(): void {
    this.router.post("/webhook/stripe", this.stripe)
    this.router.post(
      "/upgrade",
      zodValidator("json", checkoutSessionSchema),
      isAuth,
      hasWorkspace,
      this.checkoutSession,
    )
    this.router.post("/billing-portal", isAuth, hasWorkspace, this.billingPortal)
  }

  stripe = async (c: StripeContext) => {
    return await this.subscriptionService.constructWebhook(c)
  }

  checkoutSession = async (c: CheckoutSessionContext) => {
    return await this.subscriptionService.checkoutSession(c)
  }

  billingPortal = async (c: CheckoutSessionContext) => {
    return await this.subscriptionService.billingPortal(c)
  }
}
