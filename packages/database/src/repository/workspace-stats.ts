import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { workspaceStats } from "../schema"
import type { DatabaseClient } from "../types"

/**
 * Get total scan count for a workspace (all time) using workspace_stats
 */
export async function getTotalClicks(db: DatabaseClient, workspaceId: string, memberId: string) {
  try {
    const [result] = await db
      .select({ totalClicks: workspaceStats.totalClicks })
      .from(workspaceStats)
      .where(and(eq(workspaceStats.workspaceId, workspaceId), eq(workspaceStats.userId, memberId)))

    return Number(result?.totalClicks ?? 0)
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
