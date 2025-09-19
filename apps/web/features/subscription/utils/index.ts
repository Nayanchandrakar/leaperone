import { TEAM_PRICING_TIERS } from "@/features/subscription/constants/pricing/team-pricing-tiers"

export function isTeamPricing(id: string) {
  return id === "team"
}

export function resolvePricingTier(id: string) {
  return TEAM_PRICING_TIERS.find((t) => t.id === id) ?? TEAM_PRICING_TIERS[0]!
}
