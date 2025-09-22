import type { PLANS } from "@/features/subscription/constants/pricing/plans"

export type PlanDuration = "monthly" | "yearly"

export type PlanInterval = {
  id: string
  title: string
  stripeId: string
  duration: PlanDuration
}

export type TeamPricingTiers = {
  id: string
  label: string
  seat: number
  pricing: Record<PlanDuration, number>
}

export type IPlans = (typeof PLANS)[0]
