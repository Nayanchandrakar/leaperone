import { getSubscriptionByWorkspaceId } from "@app/database/repository/subscription"
import type { SubscriptionActive } from "../types"

export function isWithinRange(now: Date, start: Date | null, end: Date | null) {
  return !!(start && end && now >= start && now <= end)
}

export function sanitizeString(input: string) {
  return input
    .replace(/[^a-zA-Z0-9-_.]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim()
}

export async function isSubscriptionActive(workspaceId: string): Promise<SubscriptionActive> {
  const sub = await getSubscriptionByWorkspaceId(workspaceId)

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
