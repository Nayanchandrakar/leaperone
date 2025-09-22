import {
  MarketingDescription,
  MarketingIntro,
  MarketingTitle,
} from "@/components/ui/marketing-intro"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { FaqSupportButton } from "@/features/marketing/components/buttons/faq-support/faq-support-button"

export const FaqHeroSection = () => {
  return (
    <MarketingIntro>
      <MarketingTitle>
        How can&nbsp;
        <MarkerText
          alt="underline"
          style={{ top: "63%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          we help you
        </MarkerText>
        &nbsp;today?
      </MarketingTitle>

      <MarketingDescription>
        You’ll find quick answers to common questions in our FAQs and if you
        need more help, feel free to reach out to us.
      </MarketingDescription>

      <FaqSupportButton />
    </MarketingIntro>
  )
}
