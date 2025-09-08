import { pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { roles } from "./roles"
import { users } from "./users"
import { workspace } from "./workspace"

export const member = pgTable("member", {
  userId: text().references(() => users.id, { onDelete: "cascade" }),
  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
  roleId: text()
    .references(() => roles.id)
    .notNull(),
  ...timestamps,
})
