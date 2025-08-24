import { Fragment } from "react"
import { PerMemberPricing } from "@/features/subscription/components/pages/pricing/per-member-pricing"
import { PricingHero } from "@/features/subscription/components/pages/pricing/pricing-hero-section"
import { PricingSection } from "@/features/subscription/components/pages/pricing/pricing-section"

export default async function PricingPage() {
  return (
    <Fragment>
      <PricingHero />
      <PricingSection />
      <PerMemberPricing />
    </Fragment>
  )
}
