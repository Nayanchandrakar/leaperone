import { Fragment } from "react"
import { getWorkspaceSubscription } from "@/features/subscription/actions/pricing/get-workspace-subscription"
import { ComparePlanSection } from "@/features/subscription/components/pages/pricing/compare-plan-section"
import { NetworkingSection } from "@/features/subscription/components/pages/pricing/networking-section"
import { PerMemberPricing } from "@/features/subscription/components/pages/pricing/per-member-pricing"
import { PricingFaqSection } from "@/features/subscription/components/pages/pricing/pricing-faq-section"
import { PricingHeroSection } from "@/features/subscription/components/pages/pricing/pricing-hero-section"
import { PricingSection } from "@/features/subscription/components/pages/pricing/pricing-section"

export default async function PricingPage() {
  const subscriptionInfo = await getWorkspaceSubscription()
  const priceId = subscriptionInfo?.priceId!

  console.log(subscriptionInfo)

  return (
    <Fragment>
      <PricingHeroSection priceId={priceId} />
      <PricingSection subscriptionInfo={subscriptionInfo} />
      <PerMemberPricing />
      <ComparePlanSection />
      <PricingFaqSection />
      <NetworkingSection />
    </Fragment>
  )
}
