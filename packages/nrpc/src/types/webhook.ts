import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "./index"

export type StripeWebhookController = Context<
  HonoEnv,
  "/stripe",
  ControllerIO<"json", {}>
>
