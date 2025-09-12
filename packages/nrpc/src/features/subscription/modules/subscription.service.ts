import { hasPermissions } from "@app/database/repository/role-permission"
import { updateUserById } from "@app/database/repository/user"
import type { InsertSubscription } from "@app/database/types"
import { ENV } from "@app/env/server"
import { ApiError } from "@app/error/index"
import type { Context } from "hono"
import type { Stripe } from "stripe"
import { MSG } from "../../../constants/message"
import { stripe } from "../../../lib/stripe"
import { TRIAL_PERIOD_DAYS } from "../constants"
import { isSubscriptionActive } from "../helpers"
import type {
  CheckoutSession,
  CheckoutSessionController,
  StripeController,
} from "../types/index"

export class SubscriptionService {
  private static instance: SubscriptionService | null = null

  private constructor() {}

  static init() {
    if (!SubscriptionService.instance) {
      SubscriptionService.instance = new SubscriptionService()
    }

    return SubscriptionService.instance
  }

  async constructWebhook(c: StripeController) {
    const buffer = await c.req.text()
    const signature = c.req.header("stripe-signature")

    if (!signature) {
      throw ApiError.badRequest(MSG.SUBSCRIPTION.MISSING_SIGNATURE)
    }

    let event: Stripe.Event
    try {
      event = await stripe.webhooks.constructEventAsync(
        buffer,
        signature,
        ENV.STRIPE_WEBHOOK,
      )
    } catch (err: any) {
      console.error("Webhook signature verification failed: ", err)
      throw ApiError.badRequest("Invalid Signature")
    }

    try {
      switch (event.type) {
        case "checkout.session.completed":
          await this.onCheckoutSessionComplete(c, event)
          break

        case "customer.subscription.deleted":
          await this.onSubscriptionDeleted(c, event)
          break

        case "customer.subscription.updated":
          await this.onSubscriptionUpdated(c, event)
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
    const user = c.get("session").user
    const workspace = c.get("workspace")
    const { priceId, seats } = c.req.valid("json")

    const canPurchase = await hasPermissions(user.id, workspace.id, [
      "manage:subscription",
    ])

    if (!canPurchase) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    let customerId = user.stripeCustomerId

    // This can happen at worst case
    if (!customerId) {
      try {
        let customer = (
          await stripe.customers.list({
            email: user.email,
            limit: 1,
          })
        ).data[0]

        if (!customer) {
          customer = await stripe.customers.create({
            email: user.email,
            name: user.name,
            metadata: {
              userId: user.id,
              workspaceId: workspace.id,
            },
          })
        }

        customerId = customer.id
        await updateUserById(user.id, {
          stripeCustomerId: customer.id,
        })
      } catch (error) {
        console.error(error)
        throw ApiError.badRequest(MSG.SUBSCRIPTION.UNABLE_TO_CREATE_CUSTOMER)
      }
    }

    const subscription = await isSubscriptionActive(workspace.id)

    if (!subscription.priceId && !subscription.customerId) {
      const checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        customer_update: {
          name: "auto",
          address: "auto",
        },
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: seats,
          },
        ],
        subscription_data: {
          trial_period_days: TRIAL_PERIOD_DAYS,
        },
        metadata: {
          userId: user.id,
          priceId: priceId,
          workspaceId: workspace.id,
        },
        client_reference_id: workspace.id,
        cancel_url: `${ENV.FRONTEND_URL}/`,
        success_url: `${ENV.FRONTEND_URL}/dashboard`,
      })

      return c.json({ url: checkoutSession.url })
    }

    return c.json(200)
  }

  async billingPortal(c: CheckoutSessionController) {
    return c.json(200)
  }

  public async onCheckoutSessionComplete(c: Context, event: Stripe.Event) {
    const session = event.data.object as CheckoutSession
    const userId = session.metadata.userId
    const workspaceId = session.metadata.workspaceId

    if (userId && workspaceId) {
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
      )
      const item = subscription.items.data[0]!

      const values: InsertSubscription = {
        customerId: subscription.customer as string,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        periodEnd: new Date(item.current_period_end * 1000),
        periodStart: new Date(item.current_period_start * 1000),
        priceId: item.price.id,
        status: subscription.status,
        subscriptionId: session.subscription as string,
        plan: "team",
        seats: item.quantity,
        ...(subscription.trial_end && {
          trialEnd: new Date(subscription.trial_end * 1000),
        }),
        ...(subscription.trial_start && {
          trialStart: new Date(subscription.trial_start * 1000),
        }),
        workspaceId,
      }

      console.log(values)
    }
  }

  public async onSubscriptionUpdated(c: Context, event: Stripe.Event) {}

  public async onSubscriptionDeleted(c: Context, event: Stripe.Event) {}
}
