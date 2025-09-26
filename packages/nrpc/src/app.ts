import { Hono } from "hono"
import assetRouter from "./features/asset/routes/asset-router"
import authRouter from "./features/auth/routes/auth-router"
import marketingRouter from "./features/marketing/routes/marketing-router"
import subscriptionRouter from "./features/subscription/routes/subscription-router"
import webhookRouter from "./features/webhook/routes/webhook-router"

const app = new Hono().basePath("/api")
const routes = app
  .route("/auth", authRouter)
  .route("/asset", assetRouter)
  .route("/webhooks", webhookRouter)
  .route("/marketing", marketingRouter)
  .route("/subscription", subscriptionRouter)

export type AppRouter = typeof routes
export default app
