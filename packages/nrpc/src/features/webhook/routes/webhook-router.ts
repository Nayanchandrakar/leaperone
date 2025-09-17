import { Hono } from "hono"
import type { HonoEnv } from "../../../types"
import { subscriptionController } from "../../subscription/modules/subscription-module"

const app = new Hono<HonoEnv>().post("/stripe", (opts) =>
  subscriptionController.stripe(opts),
)

export default app
