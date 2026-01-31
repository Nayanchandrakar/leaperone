import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { storage } from "../schema"
import type { DatabaseClient } from "../types"

export async function getStorageByWorkspaceIdAndUserId(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
) {
  try {
    const [data] = await db
      .select()
      .from(storage)
      .where(and(eq(storage.workspaceId, workspaceId), eq(storage.userId, userId)))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
