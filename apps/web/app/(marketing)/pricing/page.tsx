import { Fragment } from "react"
import { ComparePlanSection } from "@/features/subscription/components/pages/pricing/compare-plan-section"
import { NetworkingSection } from "@/features/subscription/components/pages/pricing/networking-section"
import { PerMemberPricing } from "@/features/subscription/components/pages/pricing/per-member-pricing"
import { PricingFaqSection } from "@/features/subscription/components/pages/pricing/pricing-faq-section"
import { PricingHeroSection } from "@/features/subscription/components/pages/pricing/pricing-hero-section"
import { PricingSection } from "@/features/subscription/components/pages/pricing/pricing-section"

export default async function PricingPage() {
  return (
    <Fragment>
      <PricingHeroSection />
      <PricingSection />
      <PerMemberPricing />
      <ComparePlanSection />
      <PricingFaqSection />
      <NetworkingSection />
    </Fragment>
  )
}
