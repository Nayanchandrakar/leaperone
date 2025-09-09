import type { SubscriptionRepository } from "@app/database/repository/subscription"
import type { StripeController } from "../types"

export class WebhookService {
  private static instance: WebhookService | null = null
  private subscriptionRepository: SubscriptionRepository

  private constructor(subscriptionRepository: SubscriptionRepository) {
    this.subscriptionRepository = subscriptionRepository
  }

  static init(subscriptionRepository: SubscriptionRepository) {
    if (!WebhookService.instance) {
      WebhookService.instance = new WebhookService(subscriptionRepository)
    }

    return WebhookService.instance
  }

  async stripe(c: StripeController) {}
}
