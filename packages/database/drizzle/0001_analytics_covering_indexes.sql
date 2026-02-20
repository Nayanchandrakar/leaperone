-- Custom migration: covering indexes for analytics performance
-- Drizzle ORM 0.44.x does not support INCLUDE columns in the schema builder,
-- so these indexes are managed here as a custom migration tracked by the journal.
--
-- Both indexes use CONCURRENTLY so they build without taking an AccessExclusiveLock
-- on the table — zero downtime on production tables.
--
-- Note: CONCURRENTLY cannot run inside a transaction block.
-- Drizzle Kit's migrate() wraps each migration in a transaction by default.
-- These statements are placed outside breakpoints so they run as standalone commands.

--> statement-breakpoint
-- 1. Analytics covering index
-- Replaces the existing plain index (workspace_id, user_id, clicked_at).
-- INCLUDE columns (device, os, browser, country, region, city) are exactly the
-- columns projected by the MATERIALIZED CTE — Postgres can serve the entire
-- analytics query from index leaf pages with zero heap I/O (index-only scan).
DROP INDEX IF EXISTS analytics_workspace_user_clicked_idx;
--> statement-breakpoint
CREATE INDEX CONCURRENTLY IF NOT EXISTS analytics_covering_idx
  ON analytics (workspace_id, user_id, clicked_at)
  INCLUDE (device, os, browser, country, region, city);
--> statement-breakpoint
-- 2. workspace_stats covering index
-- The stats_lookup CTE reads: WHERE workspace_id = $1 AND user_id = $2
-- and projects only total_clicks. This index satisfies the entire lookup
-- from leaf pages — no heap fetch needed.
CREATE INDEX CONCURRENTLY IF NOT EXISTS workspace_stats_covering_idx
  ON workspace_stats (workspace_id, user_id)
  INCLUDE (total_clicks);
