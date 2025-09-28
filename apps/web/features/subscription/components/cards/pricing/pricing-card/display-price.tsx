"use client"

import type { SubscriptionPlan } from "@app/database/types"
import { useMemo } from "react"
import { CountingNumber } from "@/features/subscription/components/ui/counting-number"
import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import { useTeamPricingStore } from "@/features/subscription/hooks/pricing/use-team-pricing-store"
import type { PlanPricing } from "@/features/subscription/types"
import { isTeamPlan } from "@/features/subscription/utils"
import { formatCurrency } from "@/utils"

interface IDisplayPrice {
  type: SubscriptionPlan
  pricing: PlanPricing
}

export const DisplayPrice = ({ type, pricing }: IDisplayPrice) => {
  const teamPricing = useTeamPricingStore((state) => state.teamPricing)
  const planInterval = usePricingIntervalStore((state) => state.planInterval)

  const price = useMemo(() => {
    return isTeamPlan(type)
      ? teamPricing.pricing[planInterval.duration]
      : pricing[planInterval.duration]
  }, [teamPricing, planInterval, pricing, type])

  return (
    <CountingNumber
      from={0}
      to={price}
      duration={1.5}
      format={formatCurrency}
      className="text-5xl font-semibold text-black tabular-nums"
    />
  )
}
