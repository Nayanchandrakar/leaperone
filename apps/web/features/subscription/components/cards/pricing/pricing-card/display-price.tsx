"use client"

import { useMemo } from "react"
import { useShallow } from "zustand/react/shallow"
import { CountingNumber } from "@/features/subscription/components/ui/counting-number"
import { usePricingStore } from "@/features/subscription/hooks/pricing/use-pricing-store"
import { isTeamPlan } from "@/features/subscription/utils"
import { formatCurrency } from "@/utils"

interface IDisplayPrice {
  planId: string
  individualPrice: number
}

export const DisplayPrice = ({ individualPrice, planId }: IDisplayPrice) => {
  const { pricingTier, planInterval } = usePricingStore(
    useShallow((state) => ({
      pricingTier: state.pricingTier,
      planInterval: state.planInterval,
    })),
  )

  const price = useMemo(() => {
    return isTeamPlan(planId)
      ? pricingTier.pricing[planInterval.duration]
      : individualPrice
  }, [planInterval, pricingTier, individualPrice, planId])

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
