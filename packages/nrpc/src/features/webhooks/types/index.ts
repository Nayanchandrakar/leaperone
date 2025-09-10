import type { Context } from "hono"
import type { ControllerIO } from "src/types"

export type StripeWebhookController = Context<
  {},
  "/stripe",
  ControllerIO<"json", {}>
>
