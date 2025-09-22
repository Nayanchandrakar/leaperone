import { create } from "zustand"
import { PLAN_INTERVALS } from "@/features/subscription/constants/pricing/plan-durations"
import { TEAM_PRICING_TIERS } from "@/features/subscription/constants/pricing/team-pricing-tiers"
import type {
  PlanInterval,
  TeamPricingTiers,
} from "@/features/subscription/types"

interface PricingStore {
  planInterval: PlanInterval
  pricingTier: TeamPricingTiers
  setPlan: (plan: PlanInterval) => void
  setPlanIntervalById: (id: string) => void
  setPricingTier: (newTier: TeamPricingTiers) => void
}

export const usePricingStore = create<PricingStore>()((set) => ({
  planInterval: PLAN_INTERVALS[0]!,
  pricingTier: TEAM_PRICING_TIERS[0]!,
  setPlanIntervalById: (id) => {
    return set({
      planInterval:
        PLAN_INTERVALS.find((p) => p.id === id) ?? PLAN_INTERVALS[0]!,
    })
  },
  setPlan: (plan) => set({ planInterval: plan }),
  setPricingTier: (newTier) => set({ pricingTier: newTier }),
}))
