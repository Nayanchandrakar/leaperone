import {
  MarketingDescription,
  MarketingIntro,
  MarketingTitle,
} from "@/components/ui/marketing-intro"
import { MarkerText } from "@/features/marketing/components/ui/marker-text"

export const HeroSection = () => {
  return (
    <MarketingIntro>
      <MarketingTitle>
        <MarkerText
          alt="marker"
          src="/assets/svg/open-mark.svg"
          style={{ top: "-55%", left: "-85%" }}
          className="lg:inline-block hidden"
        >
          Create
        </MarkerText>
        &nbsp;Digital Business Cards in 3 Easy Steps. Then Capture Leads &
        Manage Clients.&nbsp;
        <MarkerText
          alt="underline"
          className="inline-flex"
          style={{ top: "55%" }}
          src="/assets/svg/dash.svg"
        >
          All in 1 Place!
        </MarkerText>
      </MarketingTitle>

      <MarketingDescription className="font-medium max-w-3xl">
        Create smart digital business cards in minutes, capture leads & manage
        clients with built-in CRM tools, all in 1 place for you & your team.
      </MarketingDescription>
    </MarketingIntro>
  )
}
