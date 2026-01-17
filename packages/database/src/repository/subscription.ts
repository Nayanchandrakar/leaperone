import { ApiError } from "@app/error"
import type { SubscriptionActive } from "@app/types"
import { eq } from "drizzle-orm"
import { subscription, workspace } from "../schema"
import type { DatabaseClient, InsertSubscription } from "../types"

function isWithinRange(now: Date, start: Date | null, end: Date | null) {
  return !!(start && end && now >= start && now <= end)
}

export async function getSubscriptionByWorkspaceId(db: DatabaseClient, workspaceId: string) {
  try {
    const [data] = await db
      .select()
      .from(subscription)
      .where(eq(subscription.workspaceId, workspaceId))
      .limit(1)
      .$withCache()

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function getSubscriptionByUserId(db: DatabaseClient, userId: string) {
  try {
    const [data] = await db
      .select({
        plan: subscription.plan,
        seats: subscription.seats,
        priceId: subscription.priceId,
      })
      .from(workspace)
      .leftJoin(subscription, eq(workspace.id, subscription.workspaceId))
      .where(eq(workspace.ownerId, userId))
      .limit(1)
      .$withCache()

    return data
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function upsertSubscription(db: DatabaseClient, values: InsertSubscription) {
  try {
    const [result] = await db
      .insert(subscription)
      .values(values)
      .onConflictDoUpdate({
        target: subscription.workspaceId,
        set: values,
      })
      .returning({ id: subscription.id })

    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function updateSubscriptionBySubscriptionId(
  db: DatabaseClient,
  subscriptionId: string,
  overrides: Partial<InsertSubscription>,
) {
  try {
    const [result] = await db
      .update(subscription)
      .set(overrides)
      .where(eq(subscription.subscriptionId, subscriptionId))
      .returning({ id: subscription.id })

    return result
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}

export async function isSubscriptionActive(
  db: DatabaseClient,
  workspaceId: string,
): Promise<SubscriptionActive> {
  const sub = await getSubscriptionByWorkspaceId(db, workspaceId)

  if (!sub) {
    return {
      active: false,
      trial: false,
      seats: 0,
      expiresAt: null,
      cancelAtPeriodEnd: false,
      plan: null,
      priceId: null,
      customerId: null,
      subscriptionId: null,
    }
  }

  const now = new Date()
  const { status, trialStart, trialEnd, periodStart, periodEnd, ...base } = sub

  const isTrial = Boolean(status === "trialing" && isWithinRange(now, trialStart, trialEnd))

  const isActive = Boolean(status === "active" && isWithinRange(now, periodStart, periodEnd))

  return {
    ...base,
    trial: isTrial,
    active: isTrial || isActive,
    expiresAt: (isTrial ? trialEnd : periodEnd)!,
  }
}
