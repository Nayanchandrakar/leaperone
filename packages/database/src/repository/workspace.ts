import { ApiError } from "@app/error"
import { desc, eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { workspace } from "../schema"

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
