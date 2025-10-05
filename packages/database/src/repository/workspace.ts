import { ApiError } from "@app/error"
import { eq } from "drizzle-orm"
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

export async function getWorkspaceIdByOwnerId(ownerId: string) {
  try {
    const [data] = await dbHttp
      .select({ id: workspace.id })
      .from(workspace)
      .where(eq(workspace.ownerId, ownerId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
