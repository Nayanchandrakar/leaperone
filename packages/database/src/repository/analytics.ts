import { ApiError } from "@app/error"
import { and, eq, gte, lte, ne } from "drizzle-orm"
import { analytics, users, workspaceMembers } from "../schema"
import type { AnalyticsParams, DatabaseClient } from "../types"

export async function getAnalyticsData(
  db: DatabaseClient,
  { workspaceId, from, to, memberId }: AnalyticsParams,
) {
  try {
    // Query analytics filtered by workspaceId, memberId, and date range
    const records = await db
      .select({
        id: analytics.id,
        userId: analytics.userId,
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
      .where(
        and(
          lte(analytics.clickedAt, to),
          gte(analytics.clickedAt, from),
          eq(analytics.userId, memberId),
          eq(analytics.workspaceId, workspaceId),
        ),
      )

    return records
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
    const members = await db
      .select({
        name: users.name,
        memberId: workspaceMembers.userId,
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
