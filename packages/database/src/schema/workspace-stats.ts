import { createId } from "@paralleldrive/cuid2"
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { businessCard } from "./business-card"
import { users } from "./users"
import { workspace } from "./workspace"

export const workspaceStats = pgTable("workspace_stats", {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),

  userId: text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  bussinessCardId: text()
    .references(() => businessCard.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  workspaceId: text()
    .references(() => workspace.id, { onDelete: "cascade" })
    .notNull()
    .unique(),

  // Total clicks
  totalClicks: integer().default(0).notNull(),

  // Monthly stats
  monthlyClicks: integer().default(0).notNull(),

  // Period stats
  period: timestamp().notNull(),

  lastClickAt: timestamp().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
})
