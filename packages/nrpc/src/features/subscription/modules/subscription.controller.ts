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

  stripe = async (c: StripeController) => {
    return await this.subscriptionService.constructWebhook(c)
  }

  checkoutSession = async (c: CheckoutSessionController) => {
    return await this.subscriptionService.checkoutSession(c)
  }

  billingPortal = async (c: CheckoutSessionController) => {
    return await this.subscriptionService.billingPortal(c)
  }
}
