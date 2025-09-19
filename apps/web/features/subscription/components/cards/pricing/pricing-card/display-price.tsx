"use client"

import { useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { CountingNumber } from "@/features/subscription/components/ui/counting-number"
import { usePricingStore } from "@/features/subscription/hooks/pricing/use-pricing-store"
import type { PlanInterval } from "@/features/subscription/types"
import { isTeamPlan } from "@/features/subscription/utils"
import { formatCurrency } from "@/utils"

interface IDisplayPrice {
  planId: string
  individualPrice: number
  currentInterval: PlanInterval
}

export const DisplayPrice = ({
  currentInterval,
  individualPrice,
  planId,
}: IDisplayPrice) => {
  const pricingTier = usePricingStore(useShallow((state) => state.pricingTier))

  const price = useMemo(() => {
    return isTeamPlan(planId)
      ? pricingTier.pricing[currentInterval]
      : individualPrice
  }, [currentInterval, pricingTier, individualPrice, planId])

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
