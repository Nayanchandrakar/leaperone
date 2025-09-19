import { create } from "zustand"
import { TEAM_PRICING_TIERS } from "@/features/subscription/constants/pricing/team-pricing-tiers"
import type {
  ITEAM_PRICING_TIER,
  PlanInterval,
} from "@/features/subscription/types"

interface PricingStore {
  interval: PlanInterval
  pricingTier: ITEAM_PRICING_TIER
  setInterval: (interval: PlanInterval) => void
  setPricingTier: (newTier: ITEAM_PRICING_TIER) => void
}

export const usePricingStore = create<PricingStore>()((set) => ({
  interval: "monthly",
  pricingTier: TEAM_PRICING_TIERS[0]!,
  setInterval: (interval) => set(() => ({ interval })),
  setPricingTier: (newTier) => set({ pricingTier: newTier }),
}))
