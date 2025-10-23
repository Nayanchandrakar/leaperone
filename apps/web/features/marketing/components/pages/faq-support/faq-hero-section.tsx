import { FaqSupportButton } from "@/features/marketing/components/buttons/faq-support/faq-support-button"
import { MarkerText } from "@/features/marketing/components/ui/marker-text"
import {
  MarketingHeader,
  MarketingHeaderDescription,
  MarketingHeaderTitle,
} from "@/features/marketing/components/ui/marketing-intro"

export const FaqHeroSection = () => {
  return (
    <MarketingHeader>
      <MarketingHeaderTitle>
        How can&nbsp;
        <MarkerText
          alt="underline"
          style={{ top: "63%" }}
          className="inline-flex"
          src="/assets/svg/dash.svg"
        >
          we help you
        </MarkerText>
        &nbsp;today?
      </MarketingHeaderTitle>

      <MarketingHeaderDescription>
        You’ll find quick answers to common questions in our FAQs and if you need more help, feel
        free to reach out to us.
      </MarketingHeaderDescription>

      <FaqSupportButton />
    </MarketingHeader>
  )
}
