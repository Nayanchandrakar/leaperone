import { db } from "@app/database"
import { getAnalyticsData, getInvitedMembersForAnalytics } from "@app/database/repository/analytics"
import { hasPermissions } from "@app/database/repository/role-permission"
import { isWorkspaceMember } from "@app/database/repository/workspace"
import { ApiError } from "@app/error"
import type { AnalyticsResult } from "@app/types"
import { MSG } from "@/constants/message"
import type { GetAnalyticsContext } from "@/types/analytics.types"

const CACHE_TTL_MS = 60_000
// Store only valid cache entries, cleanup is incremental on write for expired
const analyticsCache = new Map<string, { data: AnalyticsResult; expiresAt: number }>()

export class AnalyticsService {
  // Use static to avoid accidental new instance bugs; method is pure
  private static createCacheKey(workspaceId: string, memberId: string, from: Date, to: Date) {
    // ISO string gives more legible cache keys and avoids collisions at ms-level granularity
    return `${workspaceId}:${memberId}:${from.toISOString()}:${to.toISOString()}`
  }

  async getAnalytics(c: GetAnalyticsContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { plan } = c.get("subscription")
    const { from, to, memberId } = c.req.valid("query")

    // If no memberId provided, default to the requesting user
    const targetMemberId = memberId || user.id

    if (targetMemberId !== user.id) {
      // Individual plan: cannot view other members' analytics
      if (plan === "individual") {
        throw ApiError.forbidden(MSG.GENERAL.PERMISSION_DENIED)
      }

      // Check membership only if requesting data for someone else
      const isMember = await isWorkspaceMember(db, workspace.id, targetMemberId)
      if (!isMember) {
        throw ApiError.notFound(MSG.ANALYTICS.MEMBER_NOT_ACCESSIBLE)
      }
    }

    // Use the static cache key generator
    const cacheKey = AnalyticsService.createCacheKey(workspace.id, targetMemberId, from, to)
    const now = Date.now()
    const cached = analyticsCache.get(cacheKey)

    let data: AnalyticsResult

    if (cached && cached.expiresAt > now) {
      data = cached.data
    } else {
      data = await getAnalyticsData(db, {
        to,
        from,
        memberId: targetMemberId,
        workspaceId: workspace.id,
      })

      // On every cache set, incrementally clean up exactly one expired entry.
      if (analyticsCache.size >= 1000) {
        // Remove oldest/first expired entry if cache grows unexpectedly large (robustness)
        let firstExpiredKey: string | undefined
        for (const [k, v] of analyticsCache) {
          if (v.expiresAt <= now) {
            firstExpiredKey = k
            break
          }
        }
        if (firstExpiredKey) {
          analyticsCache.delete(firstExpiredKey)
        }
      }
      analyticsCache.set(cacheKey, { data, expiresAt: now + CACHE_TTL_MS })
    }

    return c.json(data)
  }

  async getInvitedMembers(c: GetAnalyticsContext) {
    const { user } = c.get("session")
    const workspace = c.get("workspace")
    const { plan } = c.get("subscription")

    // Only team plan users can view invited members
    if (plan !== "team") {
      return c.json({ members: [] })
    }

    // Check permissions before querying DB
    const canViewMembers = await hasPermissions(db, user.id, ["view:member-analytics"])
    if (!canViewMembers) {
      return c.json({ members: [] })
    }

    // Fetch all invited members excluding the requesting user
    const invitedMembers = await getInvitedMembersForAnalytics(db, workspace.id, user.id)
    return c.json({ members: invitedMembers })
  }
}
