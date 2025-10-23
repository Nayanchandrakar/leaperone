import type { CheckoutSessionSchema } from "@app/zod/types"
import type { Context } from "hono"
import type Stripe from "stripe"
import type { ControllerIO, HonoEnv } from "../../../types"
import type { PLANS } from "../constants/index"

export type CheckoutSessionController = Context<
  HonoEnv,
  "/checkout",
  ControllerIO<"json", CheckoutSessionSchema>
>

export type StripeController = Context<HonoEnv, "/stripe", ControllerIO<"json", {}>>

export type CheckoutSession = Stripe.Checkout.Session & {
  metadata: {
    userId: string
    workspaceId: string
  }
}

export type PlansKey = keyof typeof PLANS
