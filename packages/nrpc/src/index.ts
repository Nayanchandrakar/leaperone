import { Hono } from "hono"
import authRouter from "./features/auth/modules/auth.routes"
import webhookRouter from "./features/webhooks/modules/webhook.routes"

const app = new Hono().basePath("/api")
const routes = app.route("/auth", authRouter).route("/webhooks", webhookRouter)

export type AppRouter = typeof routes
export default app
