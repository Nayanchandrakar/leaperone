import { MarkerText } from "@/features/marketing/components/ui/marker-text"
import {
  MarketingHeader,
  MarketingHeaderDescription,
  MarketingHeaderTitle,
} from "@/features/marketing/components/ui/marketing-intro"
import { PriceIntervalButton } from "@/features/subscription/components/buttons/pricing/price-interval-button"
import type { SubscriptionInfo } from "@/features/subscription/types"

interface ISubscriptionInfo {
  subscription: SubscriptionInfo
}

export const PricingHeroSection = ({ subscription }: ISubscriptionInfo) => {
  return (
    <MarketingHeader>
      <MarketingHeaderTitle>
        <MarkerText
          alt="underline"
          style={{ top: "63%" }}
          className="inline-flex"
          src="/assets/svg/dash.svg"
        >
          Plans and Pricing
        </MarkerText>
      </MarketingHeaderTitle>

      <MarketingHeaderDescription>
        Get a 7 day free trial with any of the plan. Buying a plan is mandatory in order to use
        Leaper CRM.
      </MarketingHeaderDescription>

      <PriceIntervalButton subscription={subscription} />
    </MarketingHeader>
  )
}
