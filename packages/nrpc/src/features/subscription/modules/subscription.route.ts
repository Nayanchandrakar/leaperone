import { checkoutSessionSchema } from "@app/zod/schema/subscription"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import type { HonoEnv } from "src/types"
import { middleware } from "../../../middleware"
import { subscriptionController } from "./subscription.module"

const app = new Hono<HonoEnv>()
  .post(
    "/upgrade",
    zValidator("json", checkoutSessionSchema),
    middleware.isAuthenticated,
    middleware.hasWorkspace,
    subscriptionController.checkoutSession,
  )
  .post(
    "/billing-portal",
    middleware.isAuthenticated,
    middleware.hasWorkspace,
    subscriptionController.billingPortal,
  )

export default app
