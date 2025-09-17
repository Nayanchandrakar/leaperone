import type { Context } from "hono"
import type { ControllerIO, HonoEnv } from "../../../types"

export type StripeWebhookController = Context<
  HonoEnv,
  "/stripe",
  ControllerIO<"json", {}>
>
