import { Button } from "@app/ui/components/button"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"

export const NetworkingSection = () => {
  return (
    <section className="container max-w-2xl! my-32 sm:my-40 space-y-8 md:space-y-12">
      <h2 className="font-semibold text-3xl text-center leading-normal">
        Ready to take your&nbsp;
        <UnderlineText className="before:-bottom-6">Team's Networking</UnderlineText>
        &nbsp; &&nbsp;
        <UnderlineText className="before:-bottom-6">Client management</UnderlineText>
        &nbsp; to the next level?
      </h2>

      <div className="space-y-3 relative before:content-[''] before:absolute before:size-10 before:bg-[url('/assets/svg/open-mark.svg')] before:bg-no-repeat before:-top-6 before:-left-14 before:bg-contain before:bg-center after:content-[''] after:absolute after:size-10 after:bg-[url('/assets/svg/close-mark.svg')] after:bg-no-repeat after:-bottom-6 after:-right-12 after:bg-contain after:bg-center after:hidden before:hidden sm:after:inline-block sm:before:inline-block max-w-[400px] mx-auto">
        <Button size="xl" className="w-full">
          Start 7 days Free Trial
        </Button>
        <Button size="xl" className="w-full" variant="green-outline">
          Get in Touch with us
        </Button>
      </div>
    </section>
  )
}
