import type { SubscriptionPlan } from "@app/database/types"
import { PLAN_INTERVALS } from "@/features/subscription/constants/pricing/plan-durations"
import { TEAM_PRICING } from "@/features/subscription/constants/pricing/team-pricing"
import type { SubscriptionInfo } from "@/features/subscription/types"

export function isTeamPlan(type: SubscriptionPlan) {
  return type === "team"
}

export function resolvePricingTier(id: string) {
  return TEAM_PRICING.find((t) => t.id === id) ?? TEAM_PRICING[0]!
}

export function getTeamPricingBySeat(seat = 0) {
  if (seat <= 0) return TEAM_PRICING[0]

  const tier = TEAM_PRICING.find((t) => seat <= t.seat)
  return tier ?? TEAM_PRICING[TEAM_PRICING.length - 1]
}

export function deriveSubscriptionState(subscription: SubscriptionInfo) {
  const planInterval = PLAN_INTERVALS.find(
    (p) => p.stripeId === subscription.priceId,
  )

  if (!planInterval) return null

  const teamPricing = getTeamPricingBySeat(subscription?.seats!)

  if (!planInterval) return null

  return { planInterval, teamPricing }
}

export function getPriceActionButtonText({
  type,
  isActive,
  hasPurchase,
}: {
  type: SubscriptionPlan
  isActive: boolean
  hasPurchase: boolean
}): string {
  if (isActive) return "Current Plan"

  if (hasPurchase) {
    return isTeamPlan(type) ? "Upgrade to Team plan" : "Switch to Solo Plan"
  }

  return "Start 7 days Free Trial"
}

export function hasPurchased(subscription: SubscriptionInfo) {
  return !!(subscription?.priceId && subscription?.plan)
}
