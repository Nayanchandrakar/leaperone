import { createId } from "@paralleldrive/cuid2"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
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
  joinedAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date()),
})
