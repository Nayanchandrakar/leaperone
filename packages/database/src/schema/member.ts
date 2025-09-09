import { pgTable, primaryKey, text, timestamp } from "drizzle-orm/pg-core"
import { timestamps } from "../utils"
import { roles } from "./roles"
import { users } from "./users"
import { workspaces } from "./workspace"

export const member = pgTable(
  "member",
  {
    userId: text().references(() => users.id, { onDelete: "cascade" }),
    workspaceId: text()
      .references(() => workspaces.id, { onDelete: "cascade" })
      .notNull(),
    roleId: text()
      .references(() => roles.id)
      .notNull(),
    joinedAt: timestamp().defaultNow().notNull(),
    ...timestamps,
  },
  (t) => [primaryKey({ columns: [t.userId, t.workspaceId] })],
)
