import { eq } from "drizzle-orm"
import { dbHttp } from "../index"
import { subscription } from "../schema"

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
