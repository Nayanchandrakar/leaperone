import { createId } from "@paralleldrive/cuid2"
import { doublePrecision, index, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { businessCard } from "./business-card"
import { users } from "./users"
import { workspace } from "./workspace"

export const analytics = pgTable(
  "analytics",
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

    businessCardId: text()
      .references(() => businessCard.id, { onDelete: "cascade" })
      .notNull(),

    // Network
    ip: text(),

    // Trigger source
    trigger: text(),

    // Device information
    device: text(),
    deviceVendor: text(),
    deviceModel: text(),

    // Location information
    continent: text().notNull(),
    country: text().notNull(),
    region: text().notNull(),
    city: text().notNull(),
    latitude: doublePrecision(),
    longitude: doublePrecision(),

    // Browser information
    browser: text(),
    browserVersion: text(),
    engine: text(),
    engineVersion: text(),

    // Operating system
    os: text(),
    osVersion: text(),
    cpuArchitecture: text(),

    // Raw user agent
    ua: text(),

    // Timestamp
    clickedAt: timestamp().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
  },
  (t) => [
    /**
     * Defines a composite index to optimize analytics queries filtering by workspace, user, and time range.
     *
     * This index targets queries with the following WHERE clause pattern:
     *   WHERE workspace_id = $1 AND user_id = $2 AND clicked_at BETWEEN $3 AND $4
     *
     * Index column order:
     *   1. workspace_id — placed first as it is commonly filtered on and provides the highest selectivity at the workspace scope.
     *   2. user_id     — placed second to further narrow results within the workspace.
     *   3. clicked_at  — placed last to support efficient range scans on timestamp.
     *
     * Important: For range scans to utilize the index efficiently, the range key (`clicked_at`) must be the last column.
     *
     * ⚠️ Note: Drizzle ORM (as of v0.44.x) does not support `INCLUDE` columns in the `index()` definition.
     *           To further enhance performance with index-only scans (querying without hitting the table),
     *           you may manually add a covering index after migration, which includes frequently selected columns:
     *
     * Example DDL to replace this index with a covering one:
     *   DROP INDEX CONCURRENTLY IF EXISTS analytics_workspace_user_clicked_idx;
     *   CREATE INDEX CONCURRENTLY analytics_covering_idx
     *     ON analytics (workspace_id, user_id, clicked_at)
     *     INCLUDE (device, os, browser, country, region, city);
     *
     * This approach enables the index to serve all needed fields for analytics queries without a table lookup.
     */
    index("analytics_ws_user_time_idx").on(t.workspaceId, t.userId, t.clickedAt),
  ],
)
