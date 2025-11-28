import {
  MarketingDescription,
  MarketingHeader,
  MarketingTitle,
} from "@/features/marketing/components/ui/marketing-intro"
import { QuoteText } from "@/features/marketing/components/ui/quote-text"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"

export const HeroSection = () => {
  return (
    <MarketingHeader id="hero-section" className="scroll-mt-50">
      <MarketingTitle>
        <QuoteText>Create</QuoteText>
        &nbsp;Digital Business Cards in 3 Easy Steps. Then Capture Leads & Manage Clients.&nbsp;
        <UnderlineText>All in 1 Place!</UnderlineText>
      </MarketingTitle>
      <MarketingDescription>
        Create smart digital business cards in minutes, capture leads & manage clients with built-in
        CRM tools, all in 1 place for you & your team.
      </MarketingDescription>
    </MarketingHeader>
  )
}
