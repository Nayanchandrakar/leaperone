import { Hono } from "hono"
import assetRouter from "./features/asset/routes/asset-router"
import authRouter from "./features/auth/modules/auth.route"
import marketingRouter from "./features/marketing/modules/marketing.route"
import subscriptionRouter from "./features/subscription/modules/subscription.route"

const app = new Hono().basePath("/api")
const routes = app
  .route("/auth", authRouter)
  .route("/asset", assetRouter)
  .route("/marketing", marketingRouter)
  .route("/subscription", subscriptionRouter)

export type AppRouter = typeof routes
export default app
