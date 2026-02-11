import { workspaceCardSettingSchema } from "@app/zod/schema/workspace"
import { HttpController } from "@/features/shared/controllers/http.controller"
import type { WorkspaceService } from "@/features/worskpace/services/workspace.service"
import { isAuth } from "@/middlewares/auth.middleware"
import {
  hasActiveSubscription,
  hasTeamPlan,
  hasWorkspace,
} from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type {
  GetCardSettingsCtx,
  GetWorkspaceStatsCtx,
  UpdateCardSettingCtx,
} from "@/types/workspace.types"

export class WorkspaceController extends HttpController {
  constructor(private readonly workspaceService: WorkspaceService) {
    super("/workspace")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.get("/stats", isAuth, hasWorkspace, hasActiveSubscription, this.getWorkspaceStats)

    this.router.get(
      "/settings",
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.getCardSettings,
    )

    this.router.put(
      "/card-setting",
      zodValidator("json", workspaceCardSettingSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.updateCardSetting,
    )
  }

  getWorkspaceStats = async (c: GetWorkspaceStatsCtx) => {
    return await this.workspaceService.getWorkspaceStats(c)
  }

  getCardSettings = async (c: GetCardSettingsCtx) => {
    return await this.workspaceService.getCardSettings(c)
  }

  updateCardSetting = async (c: UpdateCardSettingCtx) => {
    return await this.workspaceService.updateCardSetting(c)
  }
}
