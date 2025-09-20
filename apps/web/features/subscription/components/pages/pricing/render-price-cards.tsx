"use client"

import { ListComponent } from "@/components/shared/list-component"
import { PricingCard } from "@/features/subscription/components/cards/pricing/pricing-card"
import { PLANS } from "@/features/subscription/constants/pricing/plans"

interface IRenderPriceCards {
  subscriptionInfo: any
}

export const RenderPriceCards = ({ subscriptionInfo }: IRenderPriceCards) => {
  return (
    <ListComponent
      items={PLANS}
      className="grid lg:grid-cols-2 gap-10 lg:gap-7 mx-auto max-w-5xl"
      renderItem={(props) => (
        <PricingCard
          key={props.id}
          subscriptionInfo={subscriptionInfo}
          {...props}
        />
      )}
    />
  )
}
