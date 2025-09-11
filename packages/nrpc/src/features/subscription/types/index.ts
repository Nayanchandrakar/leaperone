import type { Context } from "hono"
import type { ControllerIO } from "src/types"
import type Stripe from "stripe"

export type StripeController = Context<{}, "/stripe", ControllerIO<"json", {}>>

export type CheckoutSession = Stripe.Checkout.Session & {
  metadata: {
    userId: string
    workspaceId: string
  }
}
