import { db } from "@app/database"
import {
  getAnalyticsData,
  getInvitedMembersForAnalytics,
  getTotalScansCount,
} from "@app/database/repository/analytics"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type { GetAnalyticsContext } from "@/types/analytics.types"

export class AnalyticsService {
  async getAnalytics(c: GetAnalyticsContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const subscription = c.get("subscription")

    const { fromDate, toDate, scope } = c.req.valid("query")

    // Only team plan users can view other members' analytics
    if (scope !== "myself" && subscription.plan !== "team") {
      throw ApiError.forbidden(MSG.SUBSCRIPTION.TEAM_PLAN_REQUIRED)
    }

    // Determine target user IDs for total count calculation
    let targetUserIds: string[] = [user.id]

    if (scope === "everyone") {
      const members = await getInvitedMembersForAnalytics(db, workspace.id, user.id)
      targetUserIds = [user.id, ...members.map((m) => m.userId)]
    } else if (scope !== "myself") {
      // Specific member - will be validated in repository
      targetUserIds = [scope]
    }

    // Fetch analytics records for the selected date range and scope
    const records = await getAnalyticsData(db, {
      userId: user.id,
      workspaceId: workspace.id,
      fromDate,
      toDate,
      scope,
    })

    // Get total scans count (all time) for the selected scope
    const totalScans = await getTotalScansCount(db, workspace.id, targetUserIds)

    // Return structured data - client handles aggregation, filtering, and formatting
    return c.json({
      data: {
        totalScans,
        scansInRange: records.length,
        records,
      },
      meta: {
        scope, // "myself" | "everyone" | specific user ID
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      },
    })
  }

  async getInvitedMembers(c: GetAnalyticsContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const subscription = c.get("subscription")

    // Business logic: Only team plan users can view invited members list
    if (subscription.plan !== "team") {
      throw ApiError.forbidden(MSG.SUBSCRIPTION.TEAM_PLAN_REQUIRED)
    }

    // Fetch invited members for the workspace
    const members = await getInvitedMembersForAnalytics(db, workspace.id, user.id)

    // Return raw member data - client handles display and formatting
    return c.json({
      data: members,
    })
  }
}
