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
  (t) => [
    /**
     * Enforces uniqueness for each (userId, workspaceId) pair.
     *
     * This ensures that there is only one stats row per user per workspace,
     * preventing duplicate tracking statistics.
     *
     * ---
     * Index design notes:
     * - Drizzle ORM v0.44.x does **not** support `INCLUDE` columns via `unique()` or `index()`.
     * - If your application frequently queries `totalClicks` by (workspace_id, user_id)—
     *   such as in the `stats_lookup` CTE—consider a *covering index* for improved performance.
     *
     * Example: Add a covering index manually after migrations
     *   CREATE INDEX CONCURRENTLY workspace_stats_covering_idx
     *     ON workspace_stats (workspace_id, user_id)
     *     INCLUDE (total_clicks);
     * This enables index-only scans, reducing need to read from the table heap.
     */
    unique().on(t.userId, t.workspaceId),
  ],
)
