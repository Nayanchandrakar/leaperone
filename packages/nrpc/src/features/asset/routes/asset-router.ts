import { preSignedUrlSchema } from "@app/zod/schema/asset"
import { Hono } from "hono"
import { checkStorageAvailability } from "../../../middlewares/asset-middleware"
import { isAuthenticated } from "../../../middlewares/auth-middleware"
import {
  hasActiveSubscription,
  hasWorkspace,
} from "../../../middlewares/subscription-middleware"
import type { HonoEnv } from "../../../types"
import { zValidator } from "../../../utils/zod-validator"
import { assetController } from "../modules/asset-module"

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
