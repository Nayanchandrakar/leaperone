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
    const [result] = await db
      .select({
        totalClicks: workspaceStats.totalClicks,
        monthlyClicks: workspaceStats.monthlyClicks,
        seatsUsed: sql<number>`(
        SELECT COUNT(*)::INTEGER
        FROM ${workspaceMembers}
        WHERE ${workspaceMembers.workspaceId} = ${workspaceStats.workspaceId}
      )`,
      })
      .from(workspaceStats)
      .where(and(eq(workspaceStats.workspaceId, workspaceId), eq(workspaceStats.userId, userId)))

    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
