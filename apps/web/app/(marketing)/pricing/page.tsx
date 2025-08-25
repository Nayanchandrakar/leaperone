import { Fragment } from "react"
import { ComparePlanPricing } from "@/features/subscription/components/pages/pricing/compare-plan-pricing"
import { PerMemberPricing } from "@/features/subscription/components/pages/pricing/per-member-pricing"
import { PricingHero } from "@/features/subscription/components/pages/pricing/pricing-hero-section"
import { PricingSection } from "@/features/subscription/components/pages/pricing/pricing-section"

export default async function PricingPage() {
  return (
    <Fragment>
      <PricingHero />
      <PricingSection />
      <PerMemberPricing />
      <ComparePlanPricing />
    </Fragment>
  )
}
