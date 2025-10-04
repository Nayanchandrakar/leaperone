import { getSubscriptionByUserId } from "@app/database/repository/subscription"
import { getSession } from "@/actions/utils"

export async function getWorkspaceSubscription() {
  const session = await getSession()
  if (!session) return null

  const subscription = await getSubscriptionByUserId(session.user.id)
  return subscription ?? null
}
