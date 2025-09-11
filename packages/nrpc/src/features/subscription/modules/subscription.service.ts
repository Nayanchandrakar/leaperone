import { ApiError } from "@app/error/index"
import type { Stripe as StripeClient } from "stripe"
import { MSG } from "../../../constants/message"
import type { Stripe } from "../lib/stripe"
import type {
  CheckoutSessionController,
  StripeController,
} from "../types/index"

export class SubscriptionService {
  private static instance: SubscriptionService | null = null
  private stripe: Stripe

  private constructor(stripe: Stripe) {
    this.stripe = stripe
  }

  static init(stripe: Stripe) {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService(stripe)
    }

    return SubscriptionService.instance
  }

  async constructWebhook(c: StripeController) {
    const buffer = await c.req.text()
    const signature = c.req.header("stripe-signature")

    if (!signature) {
      throw ApiError.badRequest(MSG.SUBSCRIPTION.MISSING_SIGNATURE)
    }

    let event: StripeClient.Event
    try {
      event = await this.stripe.constructWebhookEvent(buffer, signature)
    } catch (err: any) {
      console.error("Webhook signature verification failed: ", err)
      throw ApiError.badRequest("Invalid Signature")
    }

    try {
      switch (event.type) {
        case "checkout.session.completed":
          await this.stripe.onCheckoutSessionComplete(c, event)
          break

        case "customer.subscription.deleted":
          await this.stripe.onSubscriptionDeleted(c, event)
          break

        case "customer.subscription.updated":
          await this.stripe.onSubscriptionUpdated(c, event)
          break

        default:
          console.warn(`Unhandled event type:${event.type}`)
      }

      return c.json({ success: true })
    } catch (err: any) {
      console.error("Error processing webhook: ", err)
      throw ApiError.badRequest("Error processing webhook")
    }
  }

  async checkoutSession(c: CheckoutSessionController) {
    return c.json(200)
  }

  async billingPortal(c: CheckoutSessionController) {
    return c.json(200)
  }
}
