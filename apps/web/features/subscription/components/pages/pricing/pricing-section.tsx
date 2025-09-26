import { RenderPriceCards } from "@/features/subscription/components/pages/pricing/render-price-cards"
import type { SubscriptionInfo } from "@/features/subscription/types"

interface IPricingSection {
  subscription: SubscriptionInfo
}

export const PricingSection = ({ subscription }: IPricingSection) => {
  return (
    <section className="container">
      <RenderPriceCards subscription={subscription} />
    </section>
  )
}
