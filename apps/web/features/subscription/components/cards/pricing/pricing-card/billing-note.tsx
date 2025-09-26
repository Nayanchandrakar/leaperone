"use client"

import { useMemo } from "react"
import { usePricingIntervalStore } from "@/features/subscription/hooks/pricing/use-pricing-interval-store"
import type { BillingNoteType } from "@/features/subscription/types"

interface IBillingNote {
  billingNote: BillingNoteType
}

export const BillingNote = ({ billingNote }: IBillingNote) => {
  const planInterval = usePricingIntervalStore((state) => state.planInterval)

  const note = useMemo(
    () => billingNote[planInterval.duration],
    [billingNote, planInterval.duration],
  )

  return (
    <p
      dangerouslySetInnerHTML={{ __html: note }}
      className="text-muted-foreground text-sm text-balance tracking-tight"
    />
  )
}
