import { ApiError } from "@app/error"
import { desc, eq } from "drizzle-orm"
import { workspace, workspaceMembers } from "../schema"
import type { DatabaseClient, InsertWorkspace } from "../types"

export async function getWorkspaceByOwnerId(db: DatabaseClient, ownerId: string) {
  try {
    const [data] = await db.select().from(workspace).where(eq(workspace.ownerId, ownerId)).limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getLatestWorkspaceIdByUserId(db: DatabaseClient, userId: string) {
  try {
    const [data] = await db
      .select({ id: workspace.id })
      .from(workspace)
      .where(eq(workspace.ownerId, userId))
      .orderBy(desc(workspace.createdAt))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getWorkspaceById(db: DatabaseClient, workspaceId: string) {
  try {
    const [data] = await db.select().from(workspace).where(eq(workspace.id, workspaceId)).limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateWorkspaceById(
  db: DatabaseClient,
  workspaceId: string,
  overrides: Partial<InsertWorkspace>,
) {
  try {
    const [updated] = await db
      .update(workspace)
      .set(overrides)
      .where(eq(workspace.id, workspaceId))
      .returning({ id: workspace.id })

    return updated
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getWorkspaceByUserId(db: DatabaseClient, userId: string) {
  try {
    // First check if user owns a workspace
    const [ownedWorkspace] = await db
      .select()
      .from(workspace)
      .where(eq(workspace.ownerId, userId))
      .limit(1)

    if (ownedWorkspace) {
      return ownedWorkspace
    }

    // If not an owner, check if user is a member of a workspace
    const [memberWorkspace] = await db
      .select({
        id: workspace.id,
        ownerId: workspace.ownerId,
        createdAt: workspace.createdAt,
        updatedAt: workspace.updatedAt,
      })
      .from(workspaceMembers)
      .innerJoin(workspace, eq(workspaceMembers.workspaceId, workspace.id))
      .where(eq(workspaceMembers.userId, userId))
      .limit(1)

    return memberWorkspace
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
