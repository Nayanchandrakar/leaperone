"use client"

import { useShallow } from "zustand/react/shallow"
import { SmoothTab } from "@/features/subscription/components/ui/smooth-tab"
import { PLAN_DURATIONS } from "@/features/subscription/constants/pricing/plan-durations"
import { usePricingStore } from "@/features/subscription/hooks/pricing/use-pricing-store"
import type { PlanInterval } from "@/features/subscription/types"

export const PriceIntervalButton = () => {
  const { interval, setInterval } = usePricingStore(
    useShallow((state) => ({
      interval: state.interval,
      setInterval: state.setInterval,
    })),
  )

  return (
    <SmoothTab
      items={PLAN_DURATIONS}
      defaultTabId={interval}
      onChange={(tabId) => setInterval(tabId as PlanInterval)}
    />
  )
}
