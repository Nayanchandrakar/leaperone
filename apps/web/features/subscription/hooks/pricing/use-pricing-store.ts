import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { PlanInterval } from "@/features/subscription/types"

interface PricingStore {
  interval: PlanInterval
  setInterval: (interval: PlanInterval) => void
}

export const usePricingStore = create<PricingStore>()(
  persist(
    (set) => ({
      interval: "monthly",
      setInterval: (interval) => set(() => ({ interval })),
    }),
    { name: "pricing-store" },
  ),
)
