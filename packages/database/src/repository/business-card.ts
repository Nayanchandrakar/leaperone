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

export async function getCardByWorkspaceIdAndUserId(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
) {
  try {
    const [data] = await db
      .select({
        id: businessCard.id,
        qrCode: businessCard.qrCode,
        status: businessCard.status,
        template: businessCard.template,
        identifier: businessCard.identifier,
      })
      .from(businessCard)
      .where(and(eq(businessCard.workspaceId, workspaceId), eq(businessCard.userId, userId)))
      .limit(1)
      .$withCache()

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getCardIdByWorkspaceIdAndUserId(
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
      .$withCache()

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

export async function deleteBusinessCardById(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
  id: string,
) {
  try {
    const [deleted] = await db
      .delete(businessCard)
      .where(
        and(
          eq(businessCard.id, id),
          eq(businessCard.userId, userId),
          eq(businessCard.workspaceId, workspaceId),
        ),
      )
      .returning({ id: businessCard.id })

    return deleted
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function deleteBusinessCardWithPermission(
  db: DatabaseClient,
  userId: string,
  workspaceId: string,
  workspaceOwnerId: string,
  businessCardId: string,
) {
  try {
    // Workspace owner can delete any card in their workspace,
    // Regular members can only delete their own cards.
    const whereArgs = [
      eq(businessCard.id, businessCardId),
      eq(businessCard.workspaceId, workspaceId),
      workspaceOwnerId === userId ? undefined : eq(businessCard.userId, userId),
    ].filter(Boolean)

    const [deleted] = await db
      .delete(businessCard)
      .where(and(...whereArgs))
      .returning({ id: businessCard.id })

    return deleted
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
