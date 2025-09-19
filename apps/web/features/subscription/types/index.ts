import type { PLANS } from "@/features/subscription/constants/pricing/plans"
import type { TEAM_PRICING_TIERS } from "../constants/pricing/team-pricing-tiers"

export type PlanInterval = "monthly" | "yearly"

export type IPlans = (typeof PLANS)[0]
export type ITEAM_PRICING_TIER = (typeof TEAM_PRICING_TIERS)[0]
