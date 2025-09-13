import type { CheckoutSessionSchema } from "@app/zod/types"
import type { Context } from "hono"
import type Stripe from "stripe"
import type { ControllerIO, HonoEnv } from "../../../types"
import type { PLANS } from "../constants"

export type CheckoutSessionController = Context<
  HonoEnv,
  "/checkout",
  ControllerIO<"json", CheckoutSessionSchema>
>

export type StripeController = Context<
  HonoEnv,
  "/stripe",
  ControllerIO<"json", {}>
>

export type CheckoutSession = Stripe.Checkout.Session & {
  metadata: {
    userId: string
    workspaceId: string
  }
}

export type IsSubscriptionActive = {
  active: boolean
  trial: boolean
  plan: string | null
  priceId: string | null
  expiresAt: Date | null
  seats: number
  cancelAtPeriodEnd: boolean
  customerId: string | null
  subscriptionId: string | null
}

export type PlansKey = keyof typeof PLANS
