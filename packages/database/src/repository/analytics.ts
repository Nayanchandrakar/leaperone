import { ApiError } from "@app/error"
import { and, between, eq, inArray, ne, sum } from "drizzle-orm"
import { analytics, users, workspaceMembers, workspaceStats } from "../schema"
import type { DatabaseClient, GetAnalyticsParams } from "../types"

export async function getAnalyticsData(
  db: DatabaseClient,
  { workspaceId, fromDate, toDate, ids }: GetAnalyticsParams,
) {
  try {
    // Query analytics filtered by workspaceId and user IDs
    // Since analytics are already scoped to workspaceId, we don't need to join workspace_members
    // The middleware ensures the user has access to this workspace
    const records = await db
      .select({
        id: analytics.id,
        userId: analytics.userId,
        name: users.name,
        device: analytics.device,
        deviceVendor: analytics.deviceVendor,
        deviceModel: analytics.deviceModel,
        browser: analytics.browser,
        browserVersion: analytics.browserVersion,
        os: analytics.os,
        osVersion: analytics.osVersion,
        country: analytics.country,
        region: analytics.region,
        city: analytics.city,
        latitude: analytics.latitude,
        longitude: analytics.longitude,
        clickedAt: analytics.clickedAt,
      })
      .from(analytics)
      .innerJoin(users, eq(analytics.userId, users.id))
      .where(
        and(
          eq(analytics.workspaceId, workspaceId),
          inArray(analytics.userId, ids),
          between(analytics.clickedAt, fromDate, toDate),
        ),
      )

    return records
  } catch (error) {
    if (error instanceof ApiError) throw error
    console.error(error)
    throw ApiError.internalServerError()
  }
}

/**
 * Get total scan count for a workspace (all time) using workspace_stats
 */
export async function getTotalScansCount(db: DatabaseClient, workspaceId: string, ids: string[]) {
  try {
    const [result] = await db
      .select({ total: sum(workspaceStats.totalClicks) })
      .from(workspaceStats)
      .where(and(eq(workspaceStats.workspaceId, workspaceId), inArray(workspaceStats.userId, ids)))

    return Number(result?.total ?? 0)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

/**
 * Get invited members for analytics scope dropdown
 */
export async function getInvitedMembersForAnalytics(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
) {
  try {
    // Return all workspace members (excluding the current user) since workspace members
    // can view each other's analytics
    const members = await db
      .select({
        memberId: workspaceMembers.userId,
        name: users.name,
      })
      .from(workspaceMembers)
      .innerJoin(users, eq(workspaceMembers.userId, users.id))
      .where(
        and(eq(workspaceMembers.workspaceId, workspaceId), ne(workspaceMembers.userId, userId)),
      )

    return members
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
