import { ApiError } from "@app/error/index"
import { eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { storage } from "../schema"

export async function getStorageByWorkspaceId(workspaceId: string) {
  try {
    const [data] = await dbHttp
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
