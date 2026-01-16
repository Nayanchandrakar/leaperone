import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { workspaceMembers } from "../schema"
import type { DatabaseClient } from "../types"

export async function isMemberOfWorkspace(db: DatabaseClient, userId: string, workspaceId: string) {
  try {
    const [member] = await db
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

export async function getWorkspaceMember(db: DatabaseClient, userId: string, workspaceId: string) {
  try {
    const [member] = await db
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
