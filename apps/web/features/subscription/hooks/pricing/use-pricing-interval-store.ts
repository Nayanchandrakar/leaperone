import { create } from "zustand"
import { PLAN_INTERVALS } from "@/features/subscription/constants/pricing/plan-durations"
import type { PlanInterval } from "@/features/subscription/types"

interface StoreProps {
  planInterval: PlanInterval
  setPlanInterval: (plan: PlanInterval) => void
  setPlanIntervalById: (id: string) => void
}

const planInterval = PLAN_INTERVALS[0]!

export const usePricingIntervalStore = create<StoreProps>()((set) => ({
  planInterval: planInterval,
  setPlanIntervalById: (id) => {
    return set({
      planInterval: PLAN_INTERVALS.find((p) => p.id === id) ?? planInterval,
    })
  },
  setPlanInterval: (plan) => set({ planInterval: plan }),
}))
