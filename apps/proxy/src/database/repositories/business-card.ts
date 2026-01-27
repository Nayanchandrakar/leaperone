import type { CachedLink, Database } from "@/types/global.types"

export async function getBusinessCardByIdentifier(sql: Database, identifier: string) {
  const [result] = await sql.query(
    `SELECT id, workspace_id, user_id FROM business_card WHERE identifier = $1 AND status = 'active' LIMIT 1`,
    [identifier],
  )
  return result as CachedLink
}
