import { PERMISSIONS } from "../constants/permissions"
import { DEFAULT_ROLES } from "../constants/roles"
import { dbHttp, dbWs } from "../index"
import {
  permissions as permissionTable,
  rolePermissions,
  roles as roleTable,
} from "../schema/index"

export class RBACService {
  private constructor() {}

  static async initializeRBAC() {
    await Promise.all([
      dbHttp.delete(permissionTable),
      dbHttp.delete(rolePermissions),
      dbHttp.delete(roleTable),
    ])

    await dbWs.transaction(async (tx) => {
      const permissions = await tx
        .insert(permissionTable)
        .values(RBACService.formattedPermissions())
        .returning()

      for (const role of DEFAULT_ROLES) {
        const [insertedRole] = await tx.insert(roleTable).values(role).returning()
        const permissionsToAssign = role.permissions.includes("*")
          ? permissions
          : permissions.filter((perm) => role.permissions.includes(perm.name))

        const rolePermissionValues = permissionsToAssign.map((perm) => ({
          roleId: insertedRole?.id!,
          permissionId: perm.id,
        }))
        await tx.insert(rolePermissions).values(rolePermissionValues)
      }
    })
  }

  static formattedPermissions() {
    const formattedValues = Object.values(PERMISSIONS).map((name) => ({
      name,
      description: `Permission for ${name.replace(":", " ")}`,
    }))

    return formattedValues
  }
}
