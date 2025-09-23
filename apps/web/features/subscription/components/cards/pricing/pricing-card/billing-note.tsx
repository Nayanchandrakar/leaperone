"use client"

import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import type { PlanDuration } from "@/features/subscription/types"

interface IBillingNote {
  billingNote: Record<PlanDuration, string>
}

export const BillingNote = ({ billingNote }: IBillingNote) => {
  const planInterval = usePricingIntervalStore((state) => state.planInterval)
  const note = billingNote[planInterval.duration]

  return (
    <p
      dangerouslySetInnerHTML={{ __html: note }}
      className="font-normal text-sm text-muted-foreground text-start"
    />
  )
}
