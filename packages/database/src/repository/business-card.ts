import { ApiError } from "@app/error"
import { DatabaseError } from "@neondatabase/serverless"
import { and, DrizzleQueryError, eq } from "drizzle-orm"
import { businessCard } from "../schema/business-card"
import { subscription } from "../schema/subscription"
import { workspaceStats } from "../schema/workspace-stats"
import type { DatabaseClient, InsertBusinessCard } from "../types"
import { isWithinRange } from "./subscription"

export async function createBusinessCard(
  db: DatabaseClient,
  { content, qrCode, identifier, design, template, userId, workspaceId }: InsertBusinessCard,
) {
  try {
    const [data] = await db
      .insert(businessCard)
      .values({ qrCode, design, userId, content, template, identifier, workspaceId })
      .returning({ identifier: businessCard.identifier })

    return data
  } catch (error) {
    console.error(error)
    if (
      error instanceof DrizzleQueryError &&
      error.cause instanceof DatabaseError &&
      error.cause.code === "23505"
    ) {
      throw ApiError.badRequest("Business card already exists.")
    }
    throw ApiError.internalServerError()
  }
}

export async function saveBusinessCard(
  db: DatabaseClient,
  { content, qrCode, identifier, design, template, userId, workspaceId }: InsertBusinessCard,
) {
  try {
    const [data] = await db
      .insert(businessCard)
      .values({ qrCode, design, userId, content, template, identifier, workspaceId })
      .onConflictDoUpdate({
        set: { content, qrCode, design, template },
        target: [businessCard.workspaceId, businessCard.userId],
      })
      .returning({ identifier: businessCard.identifier })

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getCardByWorkspaceIdAndUserId(
  db: DatabaseClient,
  workspaceId: string,
  userId: string,
  withCard?: boolean,
) {
  try {
    const [data] = await db
      .select({
        id: businessCard.id,
        qrCode: businessCard.qrCode,
        status: businessCard.status,
        template: businessCard.template,
        identifier: businessCard.identifier,
        ...(withCard ? { design: businessCard.design, content: businessCard.content } : undefined),
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

    const data = await db.transaction(async (tx) => {
      const [card] = await tx
        .delete(businessCard)
        .where(and(...whereArgs))
        .returning({ id: businessCard.id, userId: businessCard.userId })

      if (card) {
        await tx
          .delete(workspaceStats)
          .where(
            and(
              eq(workspaceStats.workspaceId, workspaceId),
              eq(workspaceStats.userId, card.userId),
            ),
          )
      }

      return card
    })

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getBusinessCardWithSubscription(db: DatabaseClient, id: string) {
  try {
    const [result] = await db
      .select({
        businessCard: {
          design: businessCard.design,
          qrCode: businessCard.qrCode,
          status: businessCard.status,
          content: businessCard.content,
          template: businessCard.template,
        },
        subscription: {
          status: subscription.status,
          trialEnd: subscription.trialEnd,
          trialStart: subscription.trialStart,
          periodEnd: subscription.periodEnd,
          periodStart: subscription.periodStart,
        },
      })
      .from(businessCard)
      .innerJoin(subscription, eq(businessCard.workspaceId, subscription.workspaceId))
      .where(eq(businessCard.id, id))
      .limit(1)
      .$withCache()

    if (!result) {
      return {
        businessCard: null,
        subscription: { active: false },
      }
    }

    const now = new Date()
    const { status, trialStart, trialEnd, periodStart, periodEnd } = result.subscription

    const isTrial = Boolean(status === "trialing" && isWithinRange(now, trialStart, trialEnd))
    const isActive = Boolean(status === "active" && isWithinRange(now, periodStart, periodEnd))

    return {
      businessCard: result.businessCard,
      subscription: { active: isTrial || isActive },
    }
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
