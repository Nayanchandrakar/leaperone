import {
  MarketingDescription,
  MarketingHeader,
  MarketingTitle,
} from "@/features/marketing/components/ui/marketing-intro"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"

export const ContactUsHeroSection = () => {
  return (
    <MarketingHeader>
      <MarketingTitle>
        <UnderlineText>Get in touch</UnderlineText>
        &nbsp;with us!
      </MarketingTitle>
      <MarketingDescription>
        Whether you have a question, need support, or want to know how Leaper CRM can boost your
        business, feel free to reach out to us and we will get back to you as soon as possible .
      </MarketingDescription>
    </MarketingHeader>
  )
}
