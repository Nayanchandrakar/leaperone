import { filesQuerySchema, preSignedUrlSchema } from "@app/zod/schema/asset"
import type { AssetService } from "@/features/asset/services/asset.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { checkStorageQuota } from "@/middlewares/asset.middleware"
import { isAuth } from "@/middlewares/auth.middleware"
import { hasActiveSubscription, hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { FileQueryContext, PreSignedUrlContext } from "@/types/asset.types"

export class AssetController extends HttpController {
  constructor(private readonly assetService: AssetService) {
    super("/asset")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.post(
      "/generate-signed-url",
      zodValidator("json", preSignedUrlSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      checkStorageQuota,
      this.generateSignedUrl,
    )
    this.router.get("/files", zodValidator("param", filesQuerySchema), isAuth, this.listFilest)
  }

  async generateSignedUrl(c: PreSignedUrlContext) {
    const url = await this.assetService.generateSignedUrl(c.get("storage"), c.req.valid("json"))
    return c.json({ url })
  }

  async listFilest(c: FileQueryContext) {
    return c.json({ files: [] })
  }
}
