import { Container } from "@/components/shared/container"
import { ListComponent } from "@/components/shared/list-component"
import { PricingCard } from "@/features/subscription/components/cards/pricing/pricing-card"
import { PLANS } from "@/features/subscription/constants/pricing/plans"

export const PricingCards = () => {
  return (
    <Container className="mt-24">
      <ListComponent
        items={PLANS}
        className="grid lg:grid-cols-2 gap-10 lg:gap-7 mx-auto max-w-5xl"
        renderItem={(props) => <PricingCard key={props.id} {...props} />}
      />
    </Container>
  )
}
