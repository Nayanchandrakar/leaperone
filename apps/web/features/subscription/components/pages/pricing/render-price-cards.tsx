"use client"

import { useShallow } from "zustand/react/shallow"
import { ListComponent } from "@/components/shared/list-component"
import { PricingCard } from "@/features/subscription/components/cards/pricing/pricing-card"
import { PLANS } from "@/features/subscription/constants/pricing/plans"
import { usePricingStore } from "@/features/subscription/hooks/pricing/use-pricing-store"

export const RenderPriceCards = () => {
  const { interval } = usePricingStore(
    useShallow((state) => ({
      interval: state.interval,
    })),
  )

  return (
    <ListComponent
      items={PLANS}
      className="grid lg:grid-cols-2 gap-10 lg:gap-7 mx-auto max-w-5xl"
      renderItem={(props) => (
        <PricingCard key={props.id} currentInterval={interval} {...props} />
      )}
    />
  )
}
