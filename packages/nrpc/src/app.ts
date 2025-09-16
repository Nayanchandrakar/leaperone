import { Hono } from "hono"
import assetRouter from "./routes/asset-router"
import authRouter from "./routes/auth-router"
import subscriptionRouter from "./routes/subscription-router"
import webhookRouter from "./routes/webhook-router"

const app = new Hono().basePath("/api")
const routes = app
  .route("/auth", authRouter)
  .route("/asset", assetRouter)
  .route("/webhooks", webhookRouter)
  .route("/subscription", subscriptionRouter)

export type AppRouter = typeof routes
export default app
