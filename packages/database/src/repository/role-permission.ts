import { and, eq, inArray, sql } from "drizzle-orm"
import { permissions as permissionTable, rolePermissions, roles, workspaceMembers } from "../schema"
import type { DatabaseClient, PermissionType } from "../types"

export async function hasPermissions(
  db: DatabaseClient,
  userId: string,
  permissions: Array<PermissionType>,
) {
  try {
    const whereCondition =
      permissions.length > 1
        ? inArray(permissionTable.name, permissions)
        : eq(permissionTable.name, permissions[0] as string)

    // Since user can only belong to ONE workspace, we don't need workspaceId
    // We just check the user's role permissions in their workspace
    const result = await db
      .select({ exists: sql`1` })
      .from(workspaceMembers)
      .innerJoin(roles, eq(workspaceMembers.roleId, roles.id))
      .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .innerJoin(permissionTable, eq(rolePermissions.permissionId, permissionTable.id))
      .where(and(eq(workspaceMembers.userId, userId), whereCondition))
      .limit(1)

    return result.length > 0
  } catch (error) {
    console.error(error)
    // throw ApiError.internalServerError()
    return false
  }
}
