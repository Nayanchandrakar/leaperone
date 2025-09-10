import type { SubscriptionRepository } from "@app/database/repository/subscription"
import { ApiError } from "@app/error/index"
import { MSG } from "../../../constants/message"
import type { Stripe } from "../lib/stripe"
import type { StripeController } from "../types/index"

export class SubscriptionService {
  private static instance: SubscriptionService | null = null
  private subscriptionRepository: SubscriptionRepository
  private stripe: Stripe

  private constructor(
    subscriptionRepository: SubscriptionRepository,
    stripe: Stripe,
  ) {
    this.stripe = stripe
    this.subscriptionRepository = subscriptionRepository
  }

  static init(subscriptionRepository: SubscriptionRepository, stripe: Stripe) {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService(
        subscriptionRepository,
        stripe,
      )
    }

    return SubscriptionService.instance
  }

  async constructWebhook(c: StripeController) {
    const signature = c.req.header("stripe-signature")

    if (!signature) {
      throw ApiError.badRequest(MSG.SUBSCRIPTION.MISSING_SIGNATURE)
    }

    try {
      const buffer = await c.req.text()
      const event = await this.stripe.constructWebhookEvent(buffer, signature)

      switch (event.type) {
        case "checkout.session.completed":
          console.log(event.data.object)
          break
        case "customer.subscription.created":
          console.log(event.data.object)
          break

        case "customer.subscription.deleted":
          console.log(event.data.object)
          break

        case "customer.subscription.updated":
          console.log(event.data.object)
          break
      }

      return c.json({ success: true })
    } catch (err: any) {
      console.log(err?.message)
      throw ApiError.badRequest(`Webhook Error:${err?.message}`)
    }
  }
}
