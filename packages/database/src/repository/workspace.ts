import { ApiError } from "@app/error"
import { and, eq, or, sql } from "drizzle-orm"
import { subscription, workspace, workspaceMembers, workspaceStats } from "../schema"
import type { DatabaseClient } from "../types"

export async function getWorkspaceAndSubscriptionData(db: DatabaseClient, userId: string) {
  try {
    const [result] = await db
      .select({
        workspace: workspace,
        subscription: subscription,
      })
      .from(workspace)
      .leftJoin(subscription, eq(workspace.id, subscription.workspaceId))
      .leftJoin(workspaceMembers, eq(workspaceMembers.workspaceId, workspace.id))
      .where(or(eq(workspace.ownerId, userId), eq(workspaceMembers.userId, userId)))
      .limit(1)
      .$withCache()

    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getWorkspaceOverview(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
) {
  try {
    // Use a subquery to always get seatsUsed, then LEFT JOIN workspaceStats
    // This ensures we return seatsUsed even if workspaceStats doesn't exist
    const [result] = await db
      .select({
        seatsUsed: sql<number>`(
          SELECT COUNT(*)::INTEGER
          FROM ${workspaceMembers}
          WHERE ${workspaceMembers.workspaceId} = ${workspaceId}
        )`,
        totalClicks: sql<number>`COALESCE(${workspaceStats.totalClicks}, 0)`,
        monthlyClicks: sql<number>`COALESCE(${workspaceStats.monthlyClicks}, 0)`,
      })
      .from(sql`(SELECT 1) AS dummy`)
      .leftJoin(
        workspaceStats,
        and(eq(workspaceStats.workspaceId, workspaceId), eq(workspaceStats.userId, userId)),
      )
      .limit(1)

    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
