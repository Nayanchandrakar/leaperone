import { Hono } from "hono"
import { subscriptionController } from "../modules/subscription-module"
import type { HonoEnv } from "../types"

const app = new Hono<HonoEnv>().post("/stripe", (opts) =>
  subscriptionController.stripe(opts),
)

export default app
