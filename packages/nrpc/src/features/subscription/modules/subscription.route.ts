import { checkoutSessionSchema } from "@app/zod/schema/subscription"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { authMiddleware } from "src/features/auth/modules/auth.module"
import type { SubscriptionEnv } from "../types"
import { subscriptionController } from "./subscription.module"

const app = new Hono<SubscriptionEnv>()
  .post(
    "/checkout",
    zValidator("json", checkoutSessionSchema),
    authMiddleware.isAuthenticated,
    subscriptionController.checkoutSession,
  )
  .post("/billing-portal", subscriptionController.billingPortal)

export default app
