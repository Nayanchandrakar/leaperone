import type { CheckoutSessionSchema } from "@app/zod/types"
import type { Context } from "hono"
import type Stripe from "stripe"
import type { PLANS } from "@/features/subscription/constants/subscription.constants"
import type { ControllerIO, HonoEnv } from "@/types/global.types"

export type CheckoutSessionContext = Context<
  HonoEnv,
  "/checkout",
  ControllerIO<"json", CheckoutSessionSchema>
>
export type StripeContext = Context<HonoEnv, "/stripe", ControllerIO<"json", {}>>
export type CheckoutSession = Stripe.Checkout.Session & {
  metadata: {
    userId: string
    workspaceId: string
  }
}

export type PlansKey = keyof typeof PLANS
