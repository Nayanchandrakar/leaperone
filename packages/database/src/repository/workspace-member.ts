import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { workspaceMembers } from "../schema"

export async function isMemberOfWorkspace(userId: string, workspaceId: string) {
  try {
    const [member] = await dbHttp
      .select({
        userId: workspaceMembers.userId,
        roleId: workspaceMembers.roleId,
        workspaceId: workspaceMembers.workspaceId,
      })
      .from(workspaceMembers)
      .where(
        and(eq(workspaceMembers.workspaceId, workspaceId), eq(workspaceMembers.userId, userId)),
      )
      .limit(1)

    return member
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
