import { ApiError } from "@app/error"
import { desc, eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { workspace } from "../schema"
import type { InsertWorkspace } from "../types"

export async function getWorkspaceByOwnerId(ownerId: string) {
  try {
    const [data] = await dbHttp
      .select()
      .from(workspace)
      .where(eq(workspace.ownerId, ownerId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getLatestWorkspaceIdByUserId(userId: string) {
  try {
    const [data] = await dbHttp
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

export async function getWorkspaceById(workspaceId: string) {
  try {
    const [data] = await dbHttp
      .select()
      .from(workspace)
      .where(eq(workspace.id, workspaceId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateWorkspaceById(
  workspaceId: string,
  overrides: Partial<InsertWorkspace>,
) {
  try {
    const [updated] = await dbHttp
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
