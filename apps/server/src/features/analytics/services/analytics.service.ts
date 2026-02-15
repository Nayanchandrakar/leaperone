import { db } from "@app/database"
import { PERMISSIONS } from "@app/database/constants/permissions"
import { getAnalyticsData, getInvitedMembersForAnalytics } from "@app/database/repository/analytics"
import { hasPermissions } from "@app/database/repository/role-permission"
import { isWorkspaceMember } from "@app/database/repository/workspace"
import { getTotalClicks } from "@app/database/repository/workspace-stats"
import { ApiError } from "@app/error"
import { MSG } from "@/constants/message"
import type { GetAnalyticsContext } from "@/types/analytics.types"

export class AnalyticsService {
  async getAnalytics(c: GetAnalyticsContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { plan } = c.get("subscription")

    const { fromDate, toDate, memberId } = c.req.valid("query")

    // Validate memberId access based on subscription plan
    if (memberId === user.id) {
      // User is requesting their own analytics - always allowed
    } else {
      // User is requesting someone else's analytics
      if (plan === "individual") {
        // Individual plan users can only view their own analytics
        throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
      }

      // Team plan users can view other workspace members' analytics
      const isMember = await isWorkspaceMember(db, workspace.id, memberId)

      // But we need to verify the requested memberId is actually a workspace member
      if (!isMember) {
        throw ApiError.notFound(MSG.ANALYTICS.MEMBER_NOT_ACCESSIBLE)
      }
    }

    // Fetch analytics records for the selected member
    const records = await getAnalyticsData(db, {
      toDate,
      fromDate,
      memberId,
      workspaceId: workspace.id,
    })

    // Get total scans count for this member (all time)
    const totalClicks = await getTotalClicks(db, workspace.id, memberId)

    return c.json({
      records,
      totalClicks,
      scansInRange: records.length,
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

    return c.json({
      members,
    })
  }
}
