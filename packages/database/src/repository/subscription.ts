import { ApiError } from "@app/error"
import { eq } from "drizzle-orm"
import { subscription } from "../schema"
import type { DatabaseClient, InsertSubscription } from "../types"
import { getWorkspaceAndSubscriptionData } from "./workspace"

export function isWithinRange(now: Date, start: Date | null, end: Date | null) {
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

export async function getWorkspaceWithSubscription(db: DatabaseClient, userId: string) {
  try {
    const result = await getWorkspaceAndSubscriptionData(db, userId)

    if (!result?.workspace) {
      return {
        workspace: null,
        subscription: {
          active: false,
          trial: false,
          seats: 0,
          expiresAt: null,
          cancelAtPeriodEnd: false,
          plan: null,
          priceId: null,
          customerId: null,
          subscriptionId: null,
        },
      }
    }

    const sub = result.subscription

    if (!sub) {
      return {
        workspace: result.workspace,
        subscription: {
          active: false,
          trial: false,
          seats: 0,
          expiresAt: null,
          cancelAtPeriodEnd: false,
          plan: null,
          priceId: null,
          customerId: null,
          subscriptionId: null,
        },
      }
    }

    const now = new Date()
    const { status, trialStart, trialEnd, periodStart, periodEnd, ...base } = sub

    const isTrial = Boolean(status === "trialing" && isWithinRange(now, trialStart, trialEnd))
    const isActive = Boolean(status === "active" && isWithinRange(now, periodStart, periodEnd))

    return {
      workspace: result.workspace,
      subscription: {
        ...base,
        trial: isTrial,
        active: isTrial || isActive,
        expiresAt: (isTrial ? trialEnd : periodEnd)!,
      },
    }
  } catch (error) {
    console.error(error)
    throw ApiError.internalServerError()
  }
}
