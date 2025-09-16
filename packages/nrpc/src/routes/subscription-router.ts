import { checkoutSessionSchema } from "@app/zod/schema/subscription"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { isAuthenticated } from "../middlewares/auth-middleware"
import { hasWorkspace } from "../middlewares/subscription-middleware"
import { subscriptionController } from "../modules/subscription-module"
import type { HonoEnv } from "../types"

const app = new Hono<HonoEnv>()
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
