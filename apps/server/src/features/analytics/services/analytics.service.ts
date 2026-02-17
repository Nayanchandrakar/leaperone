import { db } from "@app/database"
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

    const { from, to, memberId } = c.req.valid("query")

    // If no memberId provided, use the current user's ID
    const targetMemberId = memberId || user.id

    if (targetMemberId !== user.id) {
      // Not requesting own analytics
      if (plan === "individual") {
        throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
      }

      // Team plan users can view other workspace members' analytics
      const isMember = await isWorkspaceMember(db, workspace.id, targetMemberId)

      // But we need to verify the requested memberId is actually a workspace member
      if (!isMember) {
        throw ApiError.notFound(MSG.ANALYTICS.MEMBER_NOT_ACCESSIBLE)
      }
    }

    // STEP 4: Data retrieval
    const [records, totalClicks] = await Promise.all([
      getAnalyticsData(db, {
        to,
        from,
        memberId: targetMemberId,
        workspaceId: workspace.id,
      }),
      getTotalClicks(db, workspace.id, targetMemberId),
    ])

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
    const canViewMembers = await hasPermissions(db, user.id, ["view:member-analytics"])

    if (!canViewMembers) {
      throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
    }

    // Fetch workspace members for analytics (excluding current user)
    const invitedMembers = await getInvitedMembersForAnalytics(db, workspace.id, user.id)

    return c.json({ members: invitedMembers })
  }
}
