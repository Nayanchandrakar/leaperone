import { ApiError } from "@app/error"
import { eq } from "drizzle-orm"
import { workspaceSettings } from "../schema"
import type { DatabaseClient, InsertWorkspaceSettings } from "../types"

export async function getWorkspaceSettingsByWorkspaceId(db: DatabaseClient, workspaceId: string) {
  try {
    const [data] = await db
      .select()
      .from(workspaceSettings)
      .where(eq(workspaceSettings.workspaceId, workspaceId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateWorkspaceSettingsByWorkspaceId(
  db: DatabaseClient,
  workspaceId: string,
  overrides: Partial<InsertWorkspaceSettings>,
) {
  try {
    const [updated] = await db
      .update(workspaceSettings)
      .set(overrides)
      .where(eq(workspaceSettings.workspaceId, workspaceId))
      .returning()

    return updated
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function createWorkspaceSettings(db: DatabaseClient, values: InsertWorkspaceSettings) {
  try {
    const [created] = await db.insert(workspaceSettings).values(values).returning()
    return created
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
