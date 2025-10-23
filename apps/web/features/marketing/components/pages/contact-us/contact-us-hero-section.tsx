import { MarkerText } from "@/features/marketing/components/ui/marker-text"
import {
  MarketingHeader,
  MarketingHeaderDescription,
  MarketingHeaderTitle,
} from "@/features/marketing/components/ui/marketing-intro"

export const ContactUsHeroSection = () => {
  return (
    <MarketingHeader>
      <MarketingHeaderTitle>
        <MarkerText
          alt="underline"
          style={{ top: "63%" }}
          className="inline-flex"
          src="/assets/svg/dash.svg"
        >
          Get in touch
        </MarkerText>
        &nbsp;with us!
      </MarketingHeaderTitle>

      <MarketingHeaderDescription>
        Whether you have a question, need support, or want to know how Leaper CRM can boost your
        business, feel free to reach out to us and we will get back to you as soon as possible .
      </MarketingHeaderDescription>
    </MarketingHeader>
  )
}
