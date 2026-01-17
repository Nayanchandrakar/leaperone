import { ApiError } from "@app/error"
import { eq } from "drizzle-orm"
import { businessCard } from "../schema/business-card"
import type { DatabaseClient, InsertBusinessCard } from "../types"

export async function createBusinessCard(db: DatabaseClient, values: InsertBusinessCard) {
  try {
    const [created] = await db.insert(businessCard).values(values).returning()
    return created
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getBusinessCardById(db: DatabaseClient, id: string) {
  try {
    const [data] = await db.select().from(businessCard).where(eq(businessCard.id, id)).limit(1)
    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getBusinessCardByWorkspaceId(db: DatabaseClient, workspaceId: string) {
  try {
    const [data] = await db
      .select({ id: businessCard.id })
      .from(businessCard)
      .where(eq(businessCard.workspaceId, workspaceId))
      .limit(1)
    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateBusinessCardById(
  db: DatabaseClient,
  id: string,
  overrides: Partial<InsertBusinessCard>,
) {
  try {
    const [updated] = await db
      .update(businessCard)
      .set(overrides)
      .where(eq(businessCard.id, id))
      .returning()

    return updated
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
