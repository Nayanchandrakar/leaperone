import type { CheckoutSessionController, StripeController } from "../types"
import type { SubscriptionService } from "./subscription.service"

export class SubscriptionController {
  private static instance: SubscriptionController | null = null
  private subscriptionService: SubscriptionService

  private constructor(subscriptionService: SubscriptionService) {
    this.subscriptionService = subscriptionService
  }

  static init(subscriptionService: SubscriptionService) {
    if (!SubscriptionController.instance) {
      SubscriptionController.instance = new SubscriptionController(
        subscriptionService,
      )
    }

    return SubscriptionController.instance
  }

  async stripe(c: StripeController) {
    return await this.subscriptionService.constructWebhook(c)
  }

  async checkoutSession(c: CheckoutSessionController) {
    return await this.subscriptionService.checkoutSession(c)
  }

  async billingPortal(c: CheckoutSessionController) {
    return await this.subscriptionService.billingPortal(c)
  }
}
