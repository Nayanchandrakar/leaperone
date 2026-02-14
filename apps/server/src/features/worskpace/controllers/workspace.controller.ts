import { workspaceSettingsSchema } from "@app/zod/schema/workspace"
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
  GetWorkspaceSettingsCtx,
  GetWorkspaceStatsCtx,
  UpdateWorkspaceSettingsCtx,
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
      this.getWorkspaceSettings,
    )

    this.router.put(
      "/settings",
      zodValidator("json", workspaceSettingsSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.updateWorkspaceSettings,
    )
  }

  getWorkspaceStats = async (c: GetWorkspaceStatsCtx) => {
    return await this.workspaceService.getWorkspaceStats(c)
  }

  getWorkspaceSettings = async (c: GetWorkspaceSettingsCtx) => {
    return await this.workspaceService.getWorkspaceSettings(c)
  }

  updateWorkspaceSettings = async (c: UpdateWorkspaceSettingsCtx) => {
    return await this.workspaceService.updateWorkspaceSettings(c)
  }
}
