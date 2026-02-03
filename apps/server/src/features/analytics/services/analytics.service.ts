import { db } from "@app/database"
import { PERMISSIONS } from "@app/database/constants/permissions"
import {
  getAnalyticsData,
  getInvitedMembersForAnalytics,
  getTotalScansCount,
} from "@app/database/repository/analytics"
import { hasPermissions } from "@app/database/repository/role-permission"
import { getWorkspaceOverview } from "@app/database/repository/workspace"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type { GetAnalyticsContext, OverviewContext } from "@/types/analytics.types"

export class AnalyticsService {
  async getAnalytics(c: GetAnalyticsContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const subscription = c.get("subscription")

    const { fromDate, toDate, ids } = c.req.valid("query")

    // - Users can always view their own analytics
    // - To view others' analytics: need team plan + VIEW_MEMBER_ANALYTICS permission
    // - Database joins ensure only workspace members' data is accessible
    const isViewingOthers = ids.length > 1 || !ids.includes(user.id)

    if (isViewingOthers) {
      // Must have team plan for multi-member analytics
      if (subscription.plan !== "team") {
        throw ApiError.forbidden(MSG.SUBSCRIPTION.TEAM_PLAN_REQUIRED)
      }

      // Must have permission to view member analytics within the workspace
      const hasPermission = await hasPermissions(db, user.id, [PERMISSIONS.VIEW_MEMBER_ANALYTICS])

      if (!hasPermission) {
        throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
      }
    }

    // Fetch analytics records for the selected date range and user IDs
    const records = await getAnalyticsData(db, {
      workspaceId: workspace.id,
      fromDate,
      toDate,
      ids,
    })

    // Get total scans count (all time)
    const totalScans = await getTotalScansCount(db, workspace.id, ids)
    return c.json({
      data: {
        totalScans,
        scansInRange: records.length,
        records,
      },
      meta: {
        ids,
        toDate: toDate.toISOString(),
        fromDate: fromDate.toISOString(),
      },
    })
  }

  async getInvitedMembers(c: GetAnalyticsContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")

    // Must have permission to view member analytics (which includes seeing member list)
    const hasPermission = await hasPermissions(db, user.id, [PERMISSIONS.VIEW_MEMBER_ANALYTICS])

    if (!hasPermission) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Fetch workspace members for analytics (excluding current user)
    const members = await getInvitedMembersForAnalytics(db, workspace.id, user.id)

    // Return raw member data - client handles display and formatting
    return c.json({
      data: members,
    })
  }

  async getOverview(c: OverviewContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const subscription = c.get("subscription")

    // Single database call to get all overview data
    const overview = await getWorkspaceOverview(db, workspace.id, user.id)

    if (!overview) {
      throw ApiError.notFound(MSG.ANALYTICS.OVERVIEW_NOT_FOUND)
    }

    return c.json({
      formsSubmitted: 0,
      seatsUsed: overview.seatsUsed,
      totalSeats: subscription.seats,
      totalClicks: overview.totalClicks,
      currentMonthClicks: overview.monthlyClicks,
    })
  }
}
