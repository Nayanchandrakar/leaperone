import { getAnalyticsSchema } from "@app/zod/schema/analytics"
import type { AnalyticsService } from "@/features/analytics/services/analytics.service"
import { HttpController } from "@/features/shared/controllers/http.controller"
import { isAuth } from "@/middlewares/auth.middleware"
import {
  hasActiveSubscription,
  hasTeamPlan,
  hasWorkspace,
} from "@/middlewares/subscription.middleware"
import { zodValidator } from "@/middlewares/validation.middleware"
import type { GetAnalyticsContext } from "@/types/analytics.types"

export class AnalyticsController extends HttpController {
  constructor(private readonly analyticsService: AnalyticsService) {
    super("/analytics")
    this.initializeRoutes()
  }

  protected override initializeRoutes() {
    this.router.get(
      "/",
      zodValidator("query", getAnalyticsSchema),
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      this.getAnalytics,
    )
    this.router.get(
      "/members",
      isAuth,
      hasWorkspace,
      hasActiveSubscription,
      hasTeamPlan,
      this.getInvitedMembers,
    )
  }

  getAnalytics = async (c: GetAnalyticsContext) => {
    return await this.analyticsService.getAnalytics(c)
  }

  getInvitedMembers = async (c: GetAnalyticsContext) => {
    return await this.analyticsService.getInvitedMembers(c)
  }
}
