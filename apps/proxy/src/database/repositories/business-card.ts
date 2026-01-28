import type { CachedLink, Database } from "@/types/global.types"

export async function getBusinessCardByIdentifier(
  sql: Database,
  identifier: string,
): Promise<CachedLink | null> {
  const { rows } = await sql.query(
    `SELECT id, workspace_id, user_id FROM business_card WHERE identifier = $1 AND status = 'active' LIMIT 1`,
    [identifier],
  )

  const result = rows[0]

  if (!result) {
    return null
  }

  return {
    userId: result.user_id,
    businessCardId: result.id,
    workspaceId: result.workspace_id,
  }
}
