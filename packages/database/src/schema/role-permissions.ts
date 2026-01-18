import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, unique } from "drizzle-orm/pg-core"
import { permissions } from "./permissions"
import { roles } from "./roles"

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),
    roleId: text()
      .references(() => roles.id, { onDelete: "cascade" })
      .notNull(),
    permissionId: text()
      .references(() => permissions.id, {
        onDelete: "cascade",
      })
      .notNull(),
  },
  (t) => [unique().on(t.roleId, t.permissionId)],
)
