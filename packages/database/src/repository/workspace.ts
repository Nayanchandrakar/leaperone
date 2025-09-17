import { ApiError } from "@app/error/index"
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
