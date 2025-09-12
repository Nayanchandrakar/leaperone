import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { roles } from "./roles"
import { users } from "./users"
import { workspace } from "./workspace"

// Workspace Members Table
export const workspaceMembers = pgTable(
  "workspace_members",
  {
    userId: text()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    workspaceId: text()
      .references(() => workspace.id, { onDelete: "cascade" })
      .notNull(),
    roleId: text()
      .references(() => roles.id)
      .notNull(),
    joinedAt: timestamp().defaultNow().notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.workspaceId] })],
)
