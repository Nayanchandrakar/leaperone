import { Button } from "@app/ui/components/button"
import { Marker } from "@/features/marketing/components/ui/marker"
import { MarkerText } from "@/features/marketing/components/ui/marker-text"

export const NetworkingSection = () => {
  return (
    <div className="container my-32 sm:my-40 flex items-center justify-center flex-col gap-8">
      <h2 className="font-semibold tracking-tight text-3xl text-center leading-tight max-w-lg">
        Ready to take your&nbsp;
        <MarkerText
          alt="underline"
          style={{ top: "50%" }}
          className="inline-flex"
          src="/assets/svg/dash.svg"
        >
          Networking
        </MarkerText>
        &nbsp; &&nbsp;
        <MarkerText
          alt="underline"
          style={{ top: "50%" }}
          className="inline-flex"
          src="/assets/svg/dash.svg"
        >
          Client management
        </MarkerText>
        &nbsp; to the next level?
      </h2>

      <div className="flex items-center justify-center flex-col gap-4 max-w-sm relative w-full">
        <Marker
          alt="marker"
          src="/assets/svg/open-mark.svg"
          className="-top-6 -left-16"
        />

        <Marker
          alt="marker"
          src="/assets/svg/close-mark.svg"
          className="-bottom-6 -right-16"
        />

        <Button size="xl" className="w-full">
          Start 7 days Free Trial
        </Button>

        <Button size="xl" className="w-full" variant="green-outline">
          Get in Touch with us
        </Button>
      </div>
    </div>
  )
}
