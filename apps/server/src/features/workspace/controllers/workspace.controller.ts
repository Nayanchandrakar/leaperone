import { workspaceCardSettingSchema } from "@app/zod/schema/workspace"
import { HttpController } from "@/features/shared/controllers/http.controller"
import type { WorkspaceService } from "@/features/workspace/services/workspace.service"
import { isAuth } from "@/middlewares/auth.middleware"
import { hasWorkspace } from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { GetCardSettingsCtx, UpdateCardSettingCtx } from "@/types/workspace.types"

export class WorkspaceController extends HttpController {
  constructor(private readonly workspaceService: WorkspaceService) {
    super("/workspace")
    this.initializeRoutes()
  }

  protected override initializeRoutes(): void {
    this.router.get("/settings", isAuth, hasWorkspace, this.getCardSettings)
    this.router.put(
      "/card-setting",
      zodValidator("json", workspaceCardSettingSchema),
      isAuth,
      hasWorkspace,
      this.updateCardSetting,
    )
  }

  getCardSettings = async (c: GetCardSettingsCtx) => {
    return await this.workspaceService.getCardSettings(c)
  }

  updateCardSetting = async (c: UpdateCardSettingCtx) => {
    return await this.workspaceService.updateCardSetting(c)
  }
}
