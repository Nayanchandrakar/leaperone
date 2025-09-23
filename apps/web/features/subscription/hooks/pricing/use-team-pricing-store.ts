import { create } from "zustand"

import { TEAM_PRICING } from "@/features/subscription/constants/pricing/team-pricing"
import type { TeamPricing } from "@/features/subscription/types"

interface StoreProps {
  teamPricing: TeamPricing
  setTeamPricing: (newTier: TeamPricing) => void
}

// Defaults
const teamPricing = TEAM_PRICING[0]!

export const useTeamPricingStore = create<StoreProps>()((set) => ({
  teamPricing: teamPricing,
  setTeamPricing: (newTier) => set({ teamPricing: newTier }),
}))
