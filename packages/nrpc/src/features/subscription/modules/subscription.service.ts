import { TRIAL_PERIOD_DAYS } from "@app/core/constants"
import { hasPermissions } from "@app/database/repository/role-permission"
import {
  getSubscriptionByWorkspaceId,
  updateSubscriptionBySubscriptionId,
  upsertSubscription,
} from "@app/database/repository/subscription"
import { updateUserById } from "@app/database/repository/user"
import { ENV } from "@app/env/server"
import { ApiError } from "@app/error"
import { logger } from "@app/logger"
import type { Stripe } from "stripe"
import { stripe } from "../../../config/stripe"
import { MSG } from "../../../constants/message"
import { createAbsoluteRoute } from "../../../utils/urls"
import { CHECKOUT_STATUSES } from "../constants"
import { getPlanDurationByPriceId, getPlanFromQuantity } from "../helpers/subscription-helper"
import type {
  CheckoutSession,
  CheckoutSessionController,
  StripeController,
} from "../types/subscription"

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
      event = await stripe.webhooks.constructEventAsync(buffer, signature, ENV.STRIPE_WEBHOOK)
    } catch (err: any) {
      logger.error("Webhook signature verification failed: ", err)
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
          logger.warn(`Unhandled event type:${event.type}`)
      }

      return c.json({ success: true })
    } catch (err: any) {
      logger.error("Error processing webhook: ", err)
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

    const canPurchase = await hasPermissions(user.id, workspace.id, ["manage:subscription"])

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
        logger.error(error)
        throw ApiError.badRequest(MSG.SUBSCRIPTION.UNABLE_TO_CREATE_CUSTOMER)
      }
    }

    const cancelUrl = createAbsoluteRoute("/")
    const successUrl = createAbsoluteRoute("/dashboard")
    const subscription = await getSubscriptionByWorkspaceId(workspace.id)

    // Create a checkout session only when there is no user subscription found or subscription is cancelled
    if (!subscription || CHECKOUT_STATUSES.includes(subscription.status)) {
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
            adjustable_quantity: {
              enabled: true,
              maximum: 12,
              minimum: 1,
            },
          },
        ],
        subscription_data:
          subscription?.trialStart && subscription?.trialEnd
            ? {}
            : { trial_period_days: TRIAL_PERIOD_DAYS },
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
    const user = c.get("session").user
    const workspace = c.get("workspace")

    const canPurchase = await hasPermissions(user.id, workspace.id, ["manage:subscription"])

    if (!canPurchase) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    const subscription = await getSubscriptionByWorkspaceId(workspace.id)
    if (!subscription || CHECKOUT_STATUSES.includes(subscription.status)) {
      throw ApiError.badRequest(MSG.SUBSCRIPTION.SUBSCRIPTION_NOT_ACTIVE)
    }

    const billingPortal = await stripe.billingPortal.sessions.create({
      customer: subscription.customerId,
      return_url: createAbsoluteRoute("/dashboard"),
    })

    return c.json({ url: billingPortal.url })
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
        logger.error(`Stripe webhook failed. Error: ${err?.message}`)
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
      logger.error(`Stripe webhook failed. Error: ${err?.message}`)
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
      logger.error(`Stripe webhook failed. Error: ${err?.message}`)
    }
  }
}
