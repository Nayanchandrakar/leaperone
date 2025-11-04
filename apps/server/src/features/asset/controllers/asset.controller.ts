import { getFileSchema, preSignedUrlSchema } from "@app/zod/schema/asset"
import type { AssetService } from "@/features/asset/services/asset.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { checkStorageQuota } from "@/middlewares/asset.middleware"
import { isAuth } from "@/middlewares/auth.middleware"
import { hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { GetFileContext, PreSignedUrlContext } from "@/types/asset.types"

export class AssetController extends HttpController {
  constructor(private readonly assetService: AssetService) {
    super("/asset")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.post(
      "/pre-signed-url",
      zodValidator("json", preSignedUrlSchema),
      isAuth,
      hasWorkspace,
      // hasActiveSubscription,
      checkStorageQuota,
      this.generateSignedUrl,
    )

    this.router.post(
      "/files",
      zodValidator("json", getFileSchema),
      isAuth,
      hasWorkspace,
      // hasActiveSubscription, ↓
      this.getFiles,
    )
  }

  generateSignedUrl = async (c: PreSignedUrlContext) => {
    const data = await this.assetService.generateSignedUrls(c.get("storage"), c.req.valid("json"))
    return c.json({ data })
  }

  getFiles = async (c: GetFileContext) => {
    const result = await this.assetService.getFiles(c.get("workspace"), c.req.valid("json"))
    return c.json(result)
  }
}
