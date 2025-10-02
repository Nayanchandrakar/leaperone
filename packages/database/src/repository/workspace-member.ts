import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { workspace, workspaceMembers } from "../schema"

export async function isMemberOfWorkspace(userId: string, workspaceId: string) {
  try {
    const [data] = await dbHttp
      .select()
      .from(workspace)
      .innerJoin(
        workspaceMembers,
        eq(workspace.id, workspaceMembers.workspaceId),
      )
      .where(
        and(
          eq(workspaceMembers.userId, userId),
          eq(workspaceMembers.workspaceId, workspaceId),
        ),
      )
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
