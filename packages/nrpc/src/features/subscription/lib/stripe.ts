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
    const checkoutSession = event.data.object as CheckoutSession
    const userId = checkoutSession.metadata.userId
    const workspaceId = checkoutSession.metadata.workspaceId

    if (userId && workspaceId) {
    }
  }

  public async onSubscriptionUpdated(c: Context, event: Client.Event) {}

  public async onSubscriptionDeleted(c: Context, event: Client.Event) {}
}
