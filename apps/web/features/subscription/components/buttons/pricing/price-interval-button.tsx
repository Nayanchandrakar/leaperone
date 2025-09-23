"use client"

import { useShallow } from "zustand/react/shallow"
import { SmoothTab } from "@/features/subscription/components/ui/smooth-tab"
import { PLAN_INTERVALS } from "@/features/subscription/constants/pricing/plan-durations"
import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import { useSubscriptionSync } from "@/features/subscription/hooks/pricing/use-subscription-sync"

interface IPriceIntervalButton {
  subscription: any
}

export const PriceIntervalButton = ({ subscription }: IPriceIntervalButton) => {
  // Sync subscription data into local state
  useSubscriptionSync(subscription)

  const { planInterval, setPlanIntervalById } = usePricingIntervalStore(
    useShallow((state) => ({
      planInterval: state.planInterval,
      setPlanIntervalById: state.setPlanIntervalById,
    })),
  )

  return (
    <SmoothTab
      items={PLAN_INTERVALS}
      selected={planInterval.id}
      onChange={setPlanIntervalById}
    />
  )
}
