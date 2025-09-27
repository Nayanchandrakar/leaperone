import type { SubscriptionService } from "../services/subscription-service"
import type {
  CheckoutSessionController,
  StripeController,
} from "../types/subscription"

export class SubscriptionController {
  private static instance: SubscriptionController | null = null

  private constructor(
    private readonly subscriptionService: SubscriptionService,
  ) {}

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
