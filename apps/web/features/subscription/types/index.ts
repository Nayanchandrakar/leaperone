import type { PLANS } from "@/features/subscription/constants/pricing/plans"

export type PlanInterval = "monthly" | "yearly"

export type IPlans = (typeof PLANS)[0]
