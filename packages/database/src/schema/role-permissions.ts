import { pgTable, primaryKey, text } from "drizzle-orm/pg-core"
import { permissions } from "./permissions"
import { roles } from "./roles"

export const rolePermissions = pgTable(
  "role_permissions",
  {
    roleId: text()
      .references(() => roles.id, { onDelete: "cascade" })
      .notNull(),
    permissionId: text()
      .references(() => permissions.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.roleId, t.permissionId] })],
)
