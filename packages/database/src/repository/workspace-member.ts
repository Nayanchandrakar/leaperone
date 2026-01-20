import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { users, workspaceMembers } from "../schema"
import type { DatabaseClient } from "../types"

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

export async function getWorkspaceMemberWithUser(
  db: DatabaseClient,
  userId: string,
  workspaceId: string,
) {
  try {
    const [result] = await db
      .select({
        member: {
          userId: workspaceMembers.userId,
          roleId: workspaceMembers.roleId,
          workspaceId: workspaceMembers.workspaceId,
        },
        user: users,
      })
      .from(workspaceMembers)
      .innerJoin(users, eq(workspaceMembers.userId, users.id))
      .where(
        and(eq(workspaceMembers.userId, userId), eq(workspaceMembers.workspaceId, workspaceId)),
      )
      .limit(1)

    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function removeMemberFromWorkspace(
  db: DatabaseClient,
  userId: string,
  workspaceId: string,
) {
  try {
    const [removed] = await db
      .delete(workspaceMembers)
      .where(
        and(eq(workspaceMembers.userId, userId), eq(workspaceMembers.workspaceId, workspaceId)),
      )
      .returning({
        userId: workspaceMembers.userId,
        workspaceId: workspaceMembers.workspaceId,
      })

    return removed
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
