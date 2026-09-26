import { ApiError } from "@app/error"
import type { AnalyticsParams, RawAnalyticsRow } from "@app/types"
import { and, eq, ne, sql } from "drizzle-orm"
import { users, workspaceMembers } from "../schema"
import type { DatabaseClient } from "../types"

/**
 * Retrieves comprehensive aggregated analytics data for a specific workspace member and date range,
 * including real-time derived analyses and an all-time total clicks counter. All analytics are
 * returned in a single query using multi-aggregate SQL with MATERIALIZED CTEs for optimal performance.
 *
 * The SQL query generates a range of metrics in one pass:
 *   1. All-time total clicks (from `workspace_stats`).
 *   2. Scan count for the given timespan.
 *   3. Scan analysis grouped by day and device.
 *   4. Scan analysis grouped by 4-hour blocks and device.
 *   5. Scan analysis grouped by day of week and device.
 *   6. Device/OS analysis (most to least).
 *   7. Browser analysis (most to least).
 *   8. Top 10 countries.
 *   9. Top 10 regions.
 *   10. Top 10 cities.
 *
 * Implementation details:
 * - A stats lookup CTE isolates the all-time click counter for optimal query planning.
 * - A filtered, MATERIALIZED CTE efficiently narrows down all relevant analytics rows for the requested scope,
 *   precomputing derived date parts and grouping fields to minimize per-query work.
 * - All metrics aggregate directly over the filtered set, leveraging json_agg for fast result marshalling.
 * - Only required columns are projected into the CTE, minimizing server-side work.
 *
 * Performance notes:
 * - Designed for high row counts (1M+): uses index-only scan on analytics, a direct PK lookup on stats, and minimal network overhead.
 *
 * @param db - A DatabaseClient for executing the SQL query.
 * @param params - AnalyticsParams object providing workspaceId, memberId, date range (`from`, `to`).
 * @returns An object with all analytics aggregations, conforming to AnalyticsResult.
 * @throws {ApiError} Throws ApiError.internalServerError() on SQL or server errors.
 */
export async function getAnalyticsData(
  db: DatabaseClient,
  { workspaceId, from, to, memberId }: AnalyticsParams,
) {
  try {
    const { rows } = (await db.execute(sql`
      -- CTE 1: workspace_stats lookup
      -- Isolated from the analytics CTE so the planner can schedule both CTEs
      -- independently and in parallel. The result is memoized across all
      -- outer SELECT references (even if only used once here), ensuring a
      -- stable execution plan for future possible sub-selects or expansion.
      WITH stats_lookup AS MATERIALIZED (
        SELECT total_clicks
        FROM   workspace_stats
        WHERE  workspace_id = ${workspaceId}
          AND  user_id      = ${memberId}
        LIMIT  1
      ),

      -- CTE 2: filtered rows
      -- MATERIALIZED forces Postgres to realize this CTE *once* in a temporary
      -- structure, even if referenced multiple times below. Without this,
      -- Postgres might inline the CTE, and thus re-run the same index-only scan
      -- for each of the downstream SELECTs, reducing efficiency as the number
      -- of subqueries grows.
      --
      -- Only the 9 required columns are selected (not SELECT *), minimizing
      -- the temp footprint.
      --
      -- Temporal fields (date_trunc, extract) are *precomputed here* so that
      -- every downstream GROUP BY operates on a simple integer/timestamp
      -- column. This eliminates redundant per-row function evaluation, which
      -- keeps the query plan fast and predictable at high row counts.
      filtered AS MATERIALIZED (
        SELECT
          date_trunc('day', clicked_at)                 AS day,
          (extract(hour FROM clicked_at)::int / 4) * 4  AS hour_block,
          extract(dow  FROM clicked_at)::int            AS day_of_week,
          device,
          os,
          browser,
          country,
          region,
          city
        FROM analytics
        WHERE workspace_id = ${workspaceId}
          AND user_id      = ${memberId}
          AND clicked_at  >= ${from}
          AND clicked_at  <= ${to}
      )

      SELECT
        -- 1. Total scans in range
        -- Simple COUNT over the materialized CTE; requires no heap access.
        (SELECT COUNT(*)::int FROM filtered) AS scans_in_range,

        -- 2. All-time total clicks
        -- Efficient PK lookup, handled via the stats_lookup CTE.
        COALESCE((SELECT total_clicks FROM stats_lookup), 0) AS total_clicks,

        -- 3. Scan Analysis: by day × device
        -- Uses json_agg (not jsonb_agg) to quickly construct raw JSON output
        -- for each distinct day/device, minimizing serialization overhead.
        (
          SELECT json_agg(r ORDER BY r.day)
          FROM (
            SELECT day::text, device, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY day, device
          ) r
        ) AS scan_analysis,

        -- 4. Time Analysis: by 4-hour block × device
        -- Groups scan events by 4-hour time blocks and device for trending.
        (
          SELECT json_agg(r ORDER BY r.hour_block)
          FROM (
            SELECT hour_block, device, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY hour_block, device
          ) r
        ) AS time_analysis,

        -- 5. Day-of-week Analysis: by dow × device
        -- Groups events by weekday (0=Sunday, 6=Saturday) and device.
        (
          SELECT json_agg(r ORDER BY r.day_of_week)
          FROM (
            SELECT day_of_week, device, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY day_of_week, device
          ) r
        ) AS day_analysis,

        -- 6. Device / OS Analysis: sorted most → least
        -- Produces counts for each OS used, ordered descending by frequency.
        (
          SELECT json_agg(r)
          FROM (
            SELECT os, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY os
            ORDER  BY count DESC
          ) r
        ) AS device_analysis,

        -- 7. Browser Analysis: sorted most → least
        -- Produces browser usage stats, ordered descending by scans.
        (
          SELECT json_agg(r)
          FROM (
            SELECT browser, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY browser
            ORDER  BY count DESC
          ) r
        ) AS browser_analysis,

        -- 8. Top Countries: top 10
        -- Finds the 10 countries with the highest scan counts; order and limit
        -- are inside the sub-select so only the "winners" are aggregated.
        (
          SELECT json_agg(r)
          FROM (
            SELECT country, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY country
            ORDER  BY count DESC
            LIMIT  10
          ) r
        ) AS top_countries,

        -- 9. Top Regions: top 10 — grouped by region and country
        (
          SELECT json_agg(r)
          FROM (
            SELECT region, country, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY region, country
            ORDER  BY count DESC
            LIMIT  10
          ) r
        ) AS top_regions,

        -- 10. Top Cities: top 10 — grouped by city and country
        (
          SELECT json_agg(r)
          FROM (
            SELECT city, country, COUNT(*)::int AS count
            FROM   filtered
            GROUP  BY city, country
            ORDER  BY count DESC
            LIMIT  10
          ) r
        ) AS top_cities
    `)) as { rows: RawAnalyticsRow[] }

    const row = rows[0] as RawAnalyticsRow

    return {
      totalClicks: row.total_clicks ?? 0,
      scansInRange: row.scans_in_range ?? 0,
      topCities: row.top_cities ?? [],
      topRegions: row.top_regions ?? [],
      topCountries: row.top_countries ?? [],
      dayAnalysis: row.day_analysis ?? [],
      scanAnalysis: row.scan_analysis ?? [],
      timeAnalysis: row.time_analysis ?? [],
      deviceAnalysis: row.device_analysis ?? [],
      browserAnalysis: row.browser_analysis ?? [],
    }
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

/**
 * Get the list of workspace members for the analytics member-scope dropdown.
 * Excludes the requesting user so they only see other members.
 */
export async function getInvitedMembersForAnalytics(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
) {
  try {
    const members = await db
      .select({
        name: users.name,
        memberId: workspaceMembers.userId,
      })
      .from(workspaceMembers)
      .innerJoin(users, eq(workspaceMembers.userId, users.id))
      .where(
        and(eq(workspaceMembers.workspaceId, workspaceId), ne(workspaceMembers.userId, userId)),
      )

    return members
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
