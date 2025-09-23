import { ApiError } from "@app/error/index"
import { eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { subscription, workspace } from "../schema"
import type { InsertSubscription } from "../types"

export async function getSubscriptionByWorkspaceId(workspaceId: string) {
  try {
    const [data] = await dbHttp
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

export async function getSubscriptionByUserId(userId: string) {
  try {
    const [data] = await dbHttp
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

export async function upsertSubscription(values: InsertSubscription) {
  try {
    const [result] = await dbHttp
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
  subscriptionId: string,
  overrides: Partial<InsertSubscription>,
) {
  try {
    const [result] = await dbHttp
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
