import { ApiError } from "@app/error"
import { desc, eq } from "drizzle-orm"
import { workspace } from "../schema"
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
