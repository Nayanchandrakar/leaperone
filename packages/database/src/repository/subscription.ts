import { eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { subscription } from "../schema"
import type { InsertSubscription } from "../types"

export async function getSubscriptionByWorkspaceId(workspaceId: string) {
  try {
    const [data] = await dbHttp
      .select()
      .from(subscription)
      .where(eq(subscription.workspaceId, workspaceId))
      .limit(1)

    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function upsertSubscription(values: InsertSubscription) {
  try {
    const [result] = await dbHttp
      .insert(subscription)
      .values(values)
      .onConflictDoUpdate({
        target: subscription.subscriptionId,
        set: values,
      })
      .returning({ id: subscription.id })

    return result
  } catch (error) {
    console.error(error)
    return null
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
    return null
  }
}
