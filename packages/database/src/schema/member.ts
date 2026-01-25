import { createId } from "@paralleldrive/cuid2"
import { pgTable, text } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { roles } from "./roles"
import { users } from "./users"
import { workspace } from "./workspace"

// Workspace Members Table
export const workspaceMembers = pgTable("workspace_members", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  userId: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull(),
  roleId: text()
    .references(() => roles.id)
    .notNull(),
  ...timestamps,
})
