import { ApiError } from "@app/error"
import { eq } from "drizzle-orm"
import { storage } from "../schema"
import type { DatabaseClient } from "../types"

export async function getStorageByWorkspaceId(db: DatabaseClient, workspaceId: string) {
  try {
    const [data] = await db
      .select()
      .from(storage)
      .where(eq(storage.workspaceId, workspaceId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getStorageIdByWorkspaceId(db: DatabaseClient, workspaceId: string) {
  try {
    const [data] = await db
      .select()
      .from(storage)
      .where(eq(storage.workspaceId, workspaceId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
