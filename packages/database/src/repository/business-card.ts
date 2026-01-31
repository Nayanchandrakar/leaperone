import { ApiError } from "@app/error"
import { and, eq } from "drizzle-orm"
import { businessCard } from "../schema/business-card"
import type { DatabaseClient, InsertBusinessCard } from "../types"

export async function createBusinessCard(db: DatabaseClient, values: InsertBusinessCard) {
  try {
    const [created] = await db
      .insert(businessCard)
      .values(values)
      .returning({ id: businessCard.id })

    return created
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getBusinessCardByWorkspaceIdAndUserId(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
) {
  try {
    const [data] = await db
      .select({ id: businessCard.id })
      .from(businessCard)
      .where(and(eq(businessCard.workspaceId, workspaceId), eq(businessCard.userId, userId)))
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
  overrides: Partial<Omit<InsertBusinessCard, "workspaceId" | "userId">>,
) {
  try {
    const [updated] = await db
      .update(businessCard)
      .set(overrides)
      .where(eq(businessCard.id, id))
      .returning({ id: businessCard.id })

    return updated
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
