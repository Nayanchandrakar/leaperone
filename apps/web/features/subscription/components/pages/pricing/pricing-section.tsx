import { Container } from "@/components/shared/container"
import { RenderPriceCards } from "@/features/subscription/components/pages/pricing/render-price-cards"

interface IPricingSection {
  subscription: any
}

export const PricingSection = ({ subscription }: IPricingSection) => {
  return (
    <Container className="mt-24">
      <RenderPriceCards subscription={subscription} />
    </Container>
  )
}
