import { preSignedUrlSchema } from "@app/zod/schema/asset"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { checkStorageAvailability } from "../middlewares/asset-middleware"
import { isAuthenticated } from "../middlewares/auth-middleware"
import {
  hasActiveSubscription,
  hasWorkspace,
} from "../middlewares/subscription-middleware"
import { assetController } from "../modules/asset-module"
import type { HonoEnv } from "../types"

const app = new Hono<HonoEnv>().post(
  "/pre-signed-url",

  /** Middlewares */
  zValidator("json", preSignedUrlSchema),
  isAuthenticated,
  hasWorkspace,
  hasActiveSubscription,
  checkStorageAvailability,

  /** Controller */
  assetController.preSignedUrl,
)

export default app
