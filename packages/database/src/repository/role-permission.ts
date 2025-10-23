import { ApiError } from "@app/error"
import { and, eq, inArray, sql } from "drizzle-orm"
import { dbHttp } from "../index"
import { permissions as permissionTable, rolePermissions, roles, workspaceMembers } from "../schema"
import type { PermissionType, RoleType } from "../types"

export async function hasPermissions(
  userId: string,
  workspaceId: string,
  permissions: Array<PermissionType>,
) {
  try {
    const whereCondition =
      permissions.length > 1
        ? inArray(permissionTable.name, permissions)
        : eq(permissionTable.name, permissions[0] as string)

    const result = await dbHttp
      .select({ exists: sql`1` })
      .from(workspaceMembers)
      .innerJoin(roles, eq(workspaceMembers.roleId, roles.id))
      .innerJoin(rolePermissions, eq(roles.id, rolePermissions.roleId))
      .innerJoin(permissionTable, eq(rolePermissions.permissionId, permissionTable.id))
      .where(
        and(
          eq(workspaceMembers.workspaceId, workspaceId),
          eq(workspaceMembers.userId, userId),
          whereCondition,
        ),
      )
      .limit(1)

    return result.length > 0
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getRoleByName(role: RoleType) {
  try {
    const [data] = await dbHttp.select().from(roles).where(eq(roles.name, role)).limit(1)

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
