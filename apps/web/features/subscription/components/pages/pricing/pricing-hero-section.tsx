import {
  MarketingDescription,
  MarketingHeader,
  MarketingTitle,
} from "@/features/marketing/components/ui/marketing-intro"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"
import { PriceIntervalButton } from "@/features/subscription/components/buttons/pricing/price-interval-button"
import type { SubscriptionInfo } from "@/features/subscription/types"

interface PricingHeroSectionProps {
  subscription: SubscriptionInfo
}

export const PricingHeroSection = ({ subscription }: PricingHeroSectionProps) => {
  return (
    <MarketingHeader>
      <MarketingTitle>
        <UnderlineText>Plans and Pricing</UnderlineText>
        &nbsp;for your business
      </MarketingTitle>

      <MarketingDescription>
        Get a 7 day free trial with any of the plan. Buying a plan is mandatory in order to use
        Leaper CRM.
      </MarketingDescription>
      <PriceIntervalButton subscription={subscription} />
    </MarketingHeader>
  )
}
