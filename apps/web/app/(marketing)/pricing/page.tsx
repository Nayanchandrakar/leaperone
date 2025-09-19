import { Fragment } from "react"
import { ComparePlanSection } from "@/features/subscription/components/pages/pricing/compare-plan-section"
import { HeroSection } from "@/features/subscription/components/pages/pricing/hero-section"
import { NetworkingSection } from "@/features/subscription/components/pages/pricing/networking-section"
import { PerMemberPricing } from "@/features/subscription/components/pages/pricing/per-member-pricing"
import { PricingFaqSection } from "@/features/subscription/components/pages/pricing/pricing-faq-section"
import { PricingSection } from "@/features/subscription/components/pages/pricing/pricing-section"
import { MeshGradient } from "@/features/subscription/components/ui/mesh-gradient"

export default async function PricingPage() {
  return (
    <Fragment>
      <MeshGradient />
      <HeroSection />
      <PricingSection />
      <PerMemberPricing />
      <ComparePlanSection />
      <PricingFaqSection />
      <NetworkingSection />
    </Fragment>
  )
}
