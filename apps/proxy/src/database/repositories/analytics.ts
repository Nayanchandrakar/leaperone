import type { InsertAnalytics } from "@app/database/types"
import type { Database } from "@/types/global.types"

export async function createAnalytics(sql: Database, values: InsertAnalytics) {
  const result = await sql.query(
    `
      INSERT INTO analytics (
        ip,
        user_id,
        workspace_id,
        business_card_id,
        device,
        device_vendor,
        device_model,
        browser,
        browser_version,
        engine,
        engine_version,
        os,
        os_version,
        cpu_architecture,
        ua,
        country,
        region,
        city,
        latitude,
        longitude,
        clicked_at
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, $12,
        $13, $14, $15, $16,
        $17, $18, $19, $20,
        $21
      )
    `,
    [
      values.ip,
      values.userId,
      values.workspaceId,
      values.businessCardId,
      values.device,
      values.deviceVendor,
      values.deviceModel,
      values.browser,
      values.browserVersion,
      values.engine,
      values.engineVersion,
      values.os,
      values.osVersion,
      values.cpuArchitecture,
      values.ua,
      values.country,
      values.region,
      values.city,
      values.latitude,
      values.longitude,
      values.clickedAt,
    ],
  )

  console.info("[Analytics Recorded]", result)
}
