import { Container } from "@/components/shared/container"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { PriceIntervalButton } from "@/features/subscription/components/buttons/pricing/price-interval-button"

export const HeroSection = () => {
  return (
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
        Get a 7 day free trial with any of the plan. Buying a plan is mandatory
        in order to use Leaper CRM.
      </p>

      <PriceIntervalButton />
    </Container>
  )
}
