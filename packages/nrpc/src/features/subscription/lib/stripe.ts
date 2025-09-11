import type { InsertSubscription } from "@app/database/types"
import { ENV } from "@app/env/server"
import type { Context } from "hono"
import { Stripe as Client } from "stripe"
import type { CheckoutSession } from "../types"

export class Stripe {
  private static instance: Stripe | null = null
  private client: Client

  private constructor() {
    this.client = new Client(ENV.STRIPE_SECRET_KEY, {
      typescript: true,
      apiVersion: "2025-08-27.basil",
    })
  }

  public static init() {
    if (!Stripe.instance) {
      Stripe.instance = new Stripe()
    }
    return Stripe.instance
  }

  public async createCustomer(params: Client.CustomerCreateParams) {
    return await this.client.customers.create(params)
  }

  public async constructWebhookEvent(
    buffer: string | Buffer,
    signature: string | Buffer | Array<string>,
  ) {
    return await this.client.webhooks.constructEventAsync(
      buffer,
      signature,
      ENV.STRIPE_WEBHOOK,
    )
  }

  public async onCheckoutSessionComplete(c: Context, event: Client.Event) {
    const session = event.data.object as CheckoutSession
    const userId = session.metadata.userId
    const workspaceId = session.metadata.workspaceId

    if (userId && workspaceId) {
      const subscription = await this.client.subscriptions.retrieve(
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

  public async onSubscriptionUpdated(c: Context, event: Client.Event) {}

  public async onSubscriptionDeleted(c: Context, event: Client.Event) {}
}
