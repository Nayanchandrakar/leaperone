import {
  MarketingDescription,
  MarketingIntro,
  MarketingTitle,
} from "@/components/ui/marketing-intro"
import { MarkerText } from "@/features/marketing/components/ui/marker-text"

export const ContactUsHeroSection = () => {
  return (
    <MarketingIntro>
      <MarketingTitle>
        <MarkerText
          alt="underline"
          style={{ top: "63%" }}
          className="inline-flex"
          src="/assets/svg/dash.svg"
        >
          Get in touch
        </MarkerText>
        &nbsp;with us!
      </MarketingTitle>

      <MarketingDescription>
        Whether you have a question, need support, or want to know how Leaper
        CRM can boost your business, feel free to reach out to us and we will
        get back to you as soon as possible .
      </MarketingDescription>
    </MarketingIntro>
  )
}
