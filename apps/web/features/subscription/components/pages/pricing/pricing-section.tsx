import { Container } from "@/components/shared/container"
import { RenderPriceCards } from "@/features/subscription/components/pages/pricing/render-price-cards"

interface IPricingSection {
  subscriptionInfo: any
}

export const PricingSection = ({ subscriptionInfo }: IPricingSection) => {
  return (
    <Container className="mt-24">
      <RenderPriceCards subscriptionInfo={subscriptionInfo} />
    </Container>
  )
}
