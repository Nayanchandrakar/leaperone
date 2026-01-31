import type { InsertAnalytics } from "@app/database/types"
import { createId } from "@paralleldrive/cuid2"
import type { Database } from "@/types/global.types"

export async function createAnalytics(sql: Database, values: InsertAnalytics) {
  try {
    await sql.query("BEGIN")

    // Insert analytics record
    await sql.query(
      `
        INSERT INTO analytics (
          id,
          user_id,
          workspace_id,
          business_card_id,
          ip,
          device,
          device_vendor,
          device_model,
          continent,
          country,
          region,
          city,
          latitude,
          longitude,
          browser,
          browser_version,
          engine,
          engine_version,
          os,
          os_version,
          cpu_architecture,
          ua,
          clicked_at
        ) VALUES (
          $1, $2, $3, $4,
          $5, $6, $7, $8,
          $9, $10, $11, $12,
          $13, $14, $15, $16,
          $17, $18, $19, $20,
          $21, $22, $23
        )
      `,
      [
        createId(), // $1
        values.userId, // $2
        values.workspaceId, // $3
        values.businessCardId, // $4
        values.ip, // $5
        values.device, // $6
        values.deviceVendor, // $7
        values.deviceModel, // $8
        values.continent, // $9
        values.country, // $10
        values.region, // $11
        values.city, // $12
        values.latitude, // $13
        values.longitude, // $14
        values.browser, // $15
        values.browserVersion, // $16
        values.engine, // $17
        values.engineVersion, // $18
        values.os, // $19
        values.osVersion, // $20
        values.cpuArchitecture, // $21
        values.ua, // $22
        values.clickedAt, // $23
      ],
    )

    // Update workspace stats - upsert to handle first click
    // Monthly clicks reset automatically when a new month is detected
    await sql.query(
      `
        INSERT INTO workspace_stats (
          id,
          user_id,
          workspace_id,
          total_clicks,
          monthly_clicks,
          last_click_at
        ) VALUES (
          $1,
          $2,
          $3,
          1,
          1,
          $4
        )
        ON CONFLICT (user_id, workspace_id)
        DO UPDATE SET
          total_clicks = workspace_stats.total_clicks + 1,
          monthly_clicks = CASE
            WHEN date_trunc('month', workspace_stats.last_click_at) = date_trunc('month', EXCLUDED.last_click_at)
            THEN workspace_stats.monthly_clicks + 1
            ELSE 1
          END,
          last_click_at = EXCLUDED.last_click_at
      `,
      [createId(), values.userId, values.workspaceId, values.clickedAt],
    )

    await sql.query("COMMIT")
    console.info("[Analytics Recorded]")
  } catch (error) {
    await sql.query("ROLLBACK")
    console.error("[Analytics Error]", error)
  }
}
