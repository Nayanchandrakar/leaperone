import {
  MarketingDescription,
  MarketingIntro,
  MarketingTitle,
} from "@/components/ui/marketing-intro"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { PriceIntervalButton } from "@/features/subscription/components/buttons/pricing/price-interval-button"

interface ISubscriptionInfo {
  priceId: string | null
}

export const PricingHeroSection = ({ priceId }: ISubscriptionInfo) => {
  return (
    <MarketingIntro>
      <MarketingTitle>
        <MarkerText
          alt="underline"
          style={{ top: "63%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          Plans and Pricing
        </MarkerText>
      </MarketingTitle>

      <MarketingDescription>
        Get a 7 day free trial with any of the plan. Buying a plan is mandatory
        in order to use Leaper CRM.
      </MarketingDescription>

      <PriceIntervalButton priceId={priceId} />
    </MarketingIntro>
  )
}
