import { MarkerText } from "@/features/marketing/components/ui/marker-text"
import {
  MarketingHeader,
  MarketingHeaderDescription,
  MarketingHeaderTitle,
} from "@/features/marketing/components/ui/marketing-intro"

export const HeroSection = () => {
  return (
    <MarketingHeader>
      <MarketingHeaderTitle>
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
      </MarketingHeaderTitle>

      <MarketingHeaderDescription className="font-medium max-w-3xl">
        Create smart digital business cards in minutes, capture leads & manage
        clients with built-in CRM tools, all in 1 place for you & your team.
      </MarketingHeaderDescription>
    </MarketingHeader>
  )
}
