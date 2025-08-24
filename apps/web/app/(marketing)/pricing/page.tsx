import { Fragment } from "react"
import { PricingHero } from "@/features/subscription/components/pages/pricing/pricing-hero-section"
import { PricingSection } from "@/features/subscription/components/pages/pricing/pricing-section"

export default async function PricingPage() {
  return (
    <Fragment>
      <PricingHero />
      <PricingSection />
    </Fragment>
  )
}
