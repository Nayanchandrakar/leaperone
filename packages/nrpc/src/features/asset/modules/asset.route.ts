import { preSignedUrlSchema } from "@app/zod/schema/asset"
import { zValidator } from "@hono/zod-validator"
import { Hono } from "hono"
import { middleware } from "../../../middleware"
import type { HonoEnv } from "../../../types"
import { assetController } from "./asset.module"

const app = new Hono<HonoEnv>().post(
  "/pre-signed-url",
  zValidator("json", preSignedUrlSchema),
  middleware.isAuthenticated,
  middleware.hasWorkspace,
  middleware.hasActiveSubscription,

  assetController.generatePreSignedUrl,
)

export default app
