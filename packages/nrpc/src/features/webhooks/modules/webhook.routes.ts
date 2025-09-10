import { Hono } from "hono"
import { subscriptionController } from "../../subscription/modules/subscription.module"

const app = new Hono().post("/stripe", (opts) =>
  subscriptionController.stripe(opts),
)

export default app
