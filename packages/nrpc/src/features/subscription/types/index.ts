import type { CheckoutSessionSchema } from "@app/zod/types"
import type { Context } from "hono"
import type Stripe from "stripe"
import type { ControllerIO, FullSession } from "../../../types"

export type CheckoutSessionController = Context<
  SubscriptionEnv,
  "/checkout",
  ControllerIO<"json", CheckoutSessionSchema>
>

export type StripeController = Context<
  SubscriptionEnv,
  "/stripe",
  ControllerIO<"json", {}>
>

export type CheckoutSession = Stripe.Checkout.Session & {
  metadata: {
    userId: string
    workspaceId: string
  }
}

export type SubscriptionEnv = {
  Variables: {
    session: FullSession
  }
}
