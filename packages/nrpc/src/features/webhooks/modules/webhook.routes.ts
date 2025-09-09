import { Hono } from "hono"
import { webhookController } from "./webhook.module"

const app = new Hono().post("/stripe", (opts) => webhookController.stripe(opts))

export default app
