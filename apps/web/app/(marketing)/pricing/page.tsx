import { Fragment } from "react"
import { ComparePlanPricing } from "@/features/subscription/components/pages/pricing/compare-plan-pricing"
import { PerMemberPricing } from "@/features/subscription/components/pages/pricing/per-member-pricing"
import { PricingFaqSection } from "@/features/subscription/components/pages/pricing/pricing-faq-section"
import { PricingHero } from "@/features/subscription/components/pages/pricing/pricing-hero-section"
import { PricingSection } from "@/features/subscription/components/pages/pricing/pricing-section"
import { FadeGridPattern } from "@/features/subscription/components/ui/fade-grid"

export default async function PricingPage() {
  return (
    <Fragment>
      <FadeGridPattern />
      <PricingHero />
      <PricingSection />
      <PerMemberPricing />
      <ComparePlanPricing />
      <PricingFaqSection />
    </Fragment>
  )
}
