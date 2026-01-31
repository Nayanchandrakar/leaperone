import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text, timestamp, unique } from "drizzle-orm/pg-core"
import { users } from "./users"
import { workspace } from "./workspace"

export const workspaceStats = pgTable(
  "workspace_stats",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => createId()),

    userId: text()
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    workspaceId: text()
      .references(() => workspace.id, { onDelete: "cascade" })
      .notNull(),

    // Total clicks
    totalClicks: integer().default(0).notNull(),

    // Monthly stats
    monthlyClicks: integer().default(0).notNull(),

    lastClickAt: timestamp().notNull(),
  },
  (t) => [unique().on(t.userId, t.workspaceId)],
)
