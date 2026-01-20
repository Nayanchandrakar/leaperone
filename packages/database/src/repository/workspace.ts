import { ApiError } from "@app/error"
import { eq, or } from "drizzle-orm"
import { subscription, workspace, workspaceMembers } from "../schema"
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
