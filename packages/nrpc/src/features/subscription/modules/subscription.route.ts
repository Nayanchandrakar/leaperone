import { checkoutSessionSchema } from "@app/zod/schema/subscription"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { isAuthenticated } from "../../../middlewares/auth-middleware"
import { hasWorkspace } from "../../../middlewares/subscription-middleware"
import type { HonoEnv } from "../../../types"
import { subscriptionController } from "./subscription.module"

const app = new Hono<HonoEnv>()
  .post("/webhook/stripe", subscriptionController.stripe)
  .post(
    "/upgrade",
    zValidator("json", checkoutSessionSchema),
    isAuthenticated,
    hasWorkspace,
    subscriptionController.checkoutSession,
  )
  .post(
    "/billing-portal",
    isAuthenticated,
    hasWorkspace,
    subscriptionController.billingPortal,
  )

export default app
