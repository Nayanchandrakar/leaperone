import { hasPermissions } from "@app/database/repository/role-permission"
import {
  getSubscriptionByWorkspaceId,
  updateSubscriptionBySubscriptionId,
  upsertSubscription,
} from "@app/database/repository/subscription"
import { updateUserById } from "@app/database/repository/user"
import { ENV } from "@app/env/server"
import { ApiError } from "@app/error/index"
import { createAbsoluteRoute } from "src/utils/urls"
import type { Stripe } from "stripe"
import { MSG } from "../../../constants/message"
import { stripe } from "../../../lib/stripe"
import { TRIAL_PERIOD_DAYS } from "../constants"
import { getPlanDurationByPriceId, getPlanFromQuantity } from "../helpers"
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
          await this.onCheckoutSessionComplete(event)
          break

        case "customer.subscription.deleted":
          await this.onSubscriptionDeleted(event)
          break

        case "customer.subscription.updated":
          await this.onSubscriptionUpdated(event)
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
    const planDuration = getPlanDurationByPriceId(priceId)

    if (!planDuration) {
      throw ApiError.badRequest(MSG.SUBSCRIPTION.SUBSCRIPTION_PLAN_NOT_FOUND)
    }

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

    const cancelUrl = createAbsoluteRoute("/")
    const successUrl = createAbsoluteRoute("/dashboard")
    const subscription = await getSubscriptionByWorkspaceId(workspace.id)

    // Create a chekout session only when
    if (
      !subscription?.priceId &&
      !subscription?.subscriptionId &&
      !subscription?.customerId
    ) {
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
          workspaceId: workspace.id,
        },
        client_reference_id: workspace.id,
        cancel_url: cancelUrl,
        success_url: successUrl,
      })

      return c.json({ url: checkoutSession.url })
    }

    // Create a billing session for existing customers
    const billingSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: successUrl,
    })

    return c.json({ url: billingSession.url })
  }

  async billingPortal(c: CheckoutSessionController) {
    return c.json(200)
  }

  async onCheckoutSessionComplete(event: Stripe.Event) {
    const session = event.data.object as CheckoutSession
    const userId = session.metadata.userId
    const workspaceId = session.metadata.workspaceId
    const subscriptionId = session.subscription?.toString()

    if (userId && workspaceId && subscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId)
        const item = subscription.items.data[0]!

        if (subscription && item) {
          const plan = getPlanFromQuantity(item.quantity!)
          await upsertSubscription({
            plan,
            workspaceId,
            seats: item.quantity,
            priceId: item.price.id,
            status: subscription.status,
            subscriptionId: subscription.id as string,
            customerId: subscription.customer as string,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            periodEnd: new Date(item.current_period_end * 1000),
            periodStart: new Date(item.current_period_start * 1000),
            ...(subscription.trial_end && {
              trialEnd: new Date(subscription.trial_end * 1000),
            }),
            ...(subscription.trial_start && {
              trialStart: new Date(subscription.trial_start * 1000),
            }),
          })
        }
      } catch (err: any) {
        console.error(`Stripe webhook failed. Error: ${err?.message}`)
      }
    }
  }

  async onSubscriptionUpdated(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription
    const item = subscription.items.data[0]!

    try {
      if (subscription.customer && subscription.id && item) {
        const plan = getPlanFromQuantity(item.quantity!)

        await updateSubscriptionBySubscriptionId(subscription.id, {
          plan,
          seats: item.quantity,
          priceId: item.price.id,
          status: subscription.status,
          subscriptionId: subscription.id as string,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
          periodEnd: new Date(item.current_period_end * 1000),
          periodStart: new Date(item.current_period_start * 1000),
          ...(subscription.trial_end && {
            trialEnd: new Date(subscription.trial_end * 1000),
          }),
          ...(subscription.trial_start && {
            trialStart: new Date(subscription.trial_start * 1000),
          }),
        })
      }
    } catch (err: any) {
      console.error(`Stripe webhook failed. Error: ${err?.message}`)
    }
  }

  async onSubscriptionDeleted(event: Stripe.Event) {
    const subscription = event.data.object as Stripe.Subscription

    try {
      if (subscription.customer && subscription.id) {
        await updateSubscriptionBySubscriptionId(subscription.id, {
          status: subscription.status,
        })
      }
    } catch (err: any) {
      console.error(`Stripe webhook failed. Error: ${err?.message}`)
    }
  }
}
