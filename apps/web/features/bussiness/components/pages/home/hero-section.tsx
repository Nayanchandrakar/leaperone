import { Container } from "@/components/shared/container"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"

export const HeroSection = () => {
  return (
    <Container className="space-y-8 my-24 md:my-28 lg:my-36 mx-auto max-w-4xl">
      <h1 className="font-bold md:font-semibold text-4xl lg:text-5xl text-center  leading-tight ">
        <MarkerText
          alt="marker"
          src="/assets/markers/mark.svg"
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
          src="/assets/markers/dash.svg"
        >
          All in 1 Place!
        </MarkerText>
      </h1>
      <p className="text-base md:text-lg font-medium text-muted-foreground text-center mx-auto max-w-3xl">
        Create smart digital business cards in minutes, capture leads & manage
        clients with built-in CRM tools, all in 1 place for you & your team.
      </p>
    </Container>
  )
}
