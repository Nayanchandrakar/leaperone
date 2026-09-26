import { AnalyticsController } from "@/features/analytics/controllers/analytics.controller"
import { AnalyticsService } from "@/features/analytics/services/analytics.service"

const analyticsService = new AnalyticsService()
const analyticsController = new AnalyticsController(analyticsService)

export { analyticsController, analyticsService }
