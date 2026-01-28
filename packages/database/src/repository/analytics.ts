import { ApiError } from "@app/error"
import { and, between, eq, inArray, sql } from "drizzle-orm"
import { analytics, invitations, users } from "../schema"
import type { DatabaseClient } from "../types"

export type GetAnalyticsParams = {
  userId: string
  workspaceId: string
  fromDate: Date
  toDate: Date
  scope: "myself" | "everyone" | string
}

export type AnalyticsRecord = {
  id: string
  userId: string
  name: string | null
  device: string | null
  deviceVendor: string | null
  deviceModel: string | null
  browser: string | null
  browserVersion: string | null
  os: string | null
  osVersion: string | null
  country: string | null
  region: string | null
  city: string | null
  latitude: number | null
  longitude: number | null
  clickedAt: Date
}

/**
 * Get analytics records with date range and scope filtering.
 * Returns raw data that client will aggregate for charts.
 */
export async function getAnalyticsData(
  db: DatabaseClient,
  { userId, workspaceId, fromDate, toDate, scope }: GetAnalyticsParams,
): Promise<AnalyticsRecord[]> {
  try {
    // Determine which user IDs to include based on scope
    let targetUserIds: string[]

    if (scope === "myself") {
      targetUserIds = [userId]
    } else if (scope === "everyone") {
      // Get all invited member user IDs + the current user
      const invitedMembers = await db
        .select({ userId: invitations.userId })
        .from(invitations)
        .where(and(eq(invitations.workspaceId, workspaceId), eq(invitations.inviterId, userId)))

      targetUserIds = [userId, ...invitedMembers.map((m) => m.userId)]
    } else {
      // Specific member ID provided - verify they are an invited member
      const [invitedMember] = await db
        .select({ userId: invitations.userId })
        .from(invitations)
        .where(
          and(
            eq(invitations.workspaceId, workspaceId),
            eq(invitations.inviterId, userId),
            eq(invitations.userId, scope),
          ),
        )
        .limit(1)

      if (!invitedMember) {
        throw ApiError.forbidden("You don't have access to this member's analytics")
      }

      targetUserIds = [scope]
    }

    // Single optimized query with date range and user filtering
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
          inArray(analytics.userId, targetUserIds),
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
 * Get total scan count for a workspace (all time)
 */
export async function getTotalScansCount(
  db: DatabaseClient,
  workspaceId: string,
  userIds: string[],
): Promise<number> {
  try {
    const [result] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(analytics)
      .where(and(eq(analytics.workspaceId, workspaceId), inArray(analytics.userId, userIds)))

    return result?.count ?? 0
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
  inviterId: string,
): Promise<{ userId: string; name: string }[]> {
  try {
    const members = await db
      .select({
        userId: invitations.userId,
        name: users.name,
      })
      .from(invitations)
      .innerJoin(users, eq(invitations.userId, users.id))
      .where(and(eq(invitations.workspaceId, workspaceId), eq(invitations.inviterId, inviterId)))

    return members
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
