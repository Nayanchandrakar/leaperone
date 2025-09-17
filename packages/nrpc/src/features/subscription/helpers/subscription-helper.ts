import { getSubscriptionByWorkspaceId } from "@app/database/repository/subscription"
import { PLANS } from "../constants"
import type { IsSubscriptionActive, PlansKey } from "../types/subscription"

function emptyStatus(): IsSubscriptionActive {
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

export async function isSubscriptionActive(
  workspaceId: string,
): Promise<IsSubscriptionActive> {
  const subscription = await getSubscriptionByWorkspaceId(workspaceId)
  const now = new Date()

  if (!subscription) {
    return emptyStatus()
  }

  const base = {
    plan: subscription.plan,
    seats: subscription.seats,
    priceId: subscription.priceId,
    customerId: subscription.customerId,
    subscriptionId: subscription.subscriptionId,
    cancelAtPeriodEnd: subscription.cancelAtPeriodEnd,
  }

  switch (subscription.status) {
    case "trialing": {
      const trialActive = !!(
        !!subscription.trialStart &&
        !!subscription.trialEnd &&
        now >= subscription.trialStart &&
        now <= subscription.trialEnd
      )

      return {
        ...base,
        active: trialActive,
        trial: true,
        expiresAt: subscription.trialEnd,
      }
    }

    case "active": {
      const active = !!(
        now >= subscription.periodStart && now <= subscription.periodEnd
      )

      return {
        ...base,
        active,
        trial: false,
        expiresAt: subscription.periodEnd,
      }
    }

    default:
      return {
        ...base,
        active: false,
        trial: false,
        expiresAt: subscription.periodEnd,
      }
  }
}

export function getPlanDurationByPriceId(priceId: string): PlansKey | null {
  for (const [key, value] of Object.entries(PLANS)) {
    if (value === priceId) return key as PlansKey
  }
  return null
}

export function getPlanFromQuantity(seats: number) {
  return Number(seats) > 1 ? "team" : "individual"
}
