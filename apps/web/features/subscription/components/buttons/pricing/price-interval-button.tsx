"use client"

import { SmoothTab } from "@/features/subscription/components/ui/smooth-tab"
import { PLAN_INTERVALS } from "@/features/subscription/constants/pricing/plan-durations"
import { useSubscriptionPlan } from "@/features/subscription/hooks/pricing/use-subscription-plan"

interface IPriceIntervalButton {
  priceId: string | null
}

export const PriceIntervalButton = ({ priceId }: IPriceIntervalButton) => {
  const { planInterval, setPlanIntervalById } = useSubscriptionPlan(priceId)

  return (
    <SmoothTab
      items={PLAN_INTERVALS}
      selected={planInterval.id}
      onChange={setPlanIntervalById}
    />
  )
}
