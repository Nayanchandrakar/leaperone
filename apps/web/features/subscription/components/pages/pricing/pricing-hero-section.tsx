import { Fragment } from "react"
import { Container } from "@/components/shared/container"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { SmoothTab } from "@/features/subscription/components/ui/smooth-tab"

const DEFAULT_TABS = [
  {
    id: "Monthly",
    title: "Monthly",
  },
  {
    id: "Yearly",
    title: "Yearly",
  },
]

export const PricingHero = () => {
  return (
    <Fragment>
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          backgroundImage: `
        linear-gradient(to right, #d1d5db 1px, transparent 1px),
        linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
      `,
          backgroundSize: "32px 32px",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
          maskImage:
            "radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)",
        }}
      />
      <Container className="space-y-8 mt-24 md:mt-28 lg:mt-36 mx-auto max-w-4xl flex items-center flex-col ">
        <h2 className="font-bold md:font-semibold text-4xl lg:text-5xl text-center  leading-tight ">
          <MarkerText
            alt="underline"
            style={{ top: "63%" }}
            className="inline-flex"
            src="/assets/markers/dash.svg"
          >
            Plans and Pricing
          </MarkerText>
        </h2>
        <p className="text-base md:text-lg font-normal text-muted-foreground text-center mx-auto max-w-2xl">
          Get a 7 day free trial with any of the plan. Buying a plan is
          mandatory in order to use Leaper CRM.
        </p>

        <SmoothTab items={DEFAULT_TABS} defaultTabId="Monthly" />
      </Container>
    </Fragment>
  )
}
