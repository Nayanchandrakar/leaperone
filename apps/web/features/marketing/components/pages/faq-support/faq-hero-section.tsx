import { FaqSupportButton } from "@/features/marketing/components/buttons/faq-support/faq-support-button"
import {
  MarketingDescription,
  MarketingHeader,
  MarketingTitle,
} from "@/features/marketing/components/ui/marketing-intro"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"

export const FaqHeroSection = () => {
  return (
    <MarketingHeader>
      <MarketingTitle>
        How can&nbsp;
        <UnderlineText>we help you</UnderlineText>
        &nbsp;today?
      </MarketingTitle>

      <MarketingDescription>
        You’ll find quick answers to common questions in our FAQs and if you need more help, feel
        free to reach out to us.
      </MarketingDescription>
      <FaqSupportButton />
    </MarketingHeader>
  )
}
