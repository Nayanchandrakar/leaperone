import { Button } from "@app/ui/components/button"
import Image from "next/image"
import { Container } from "@/components/shared/container"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"

export const NetworkingSection = () => {
  return (
    <Container className="my-32 sm:my-40 mx-auto max-w-lg">
      <h2 className="font-bold md:font-semibold text-3xl text-center leading-normal">
        Ready to take your&nbsp;
        <MarkerText
          alt="underline"
          style={{ top: "50%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          Networking
        </MarkerText>
        &nbsp; &&nbsp;
        <MarkerText
          alt="underline"
          style={{ top: "50%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          Client management
        </MarkerText>
        &nbsp; to the next level?
      </h2>

      <div className="flex items-center justify-center flex-col gap-4 mt-8 mx-auto max-w-sm relative">
        <Image
          width={50}
          height={50}
          alt="marker"
          src="/assets/markers/open-mark.svg"
          className="absolute -top-6 -left-16 hidden sm:inline-block pointer-events-none"
        />

        <Image
          width={50}
          height={50}
          alt="marker"
          src="/assets/markers/close-mark.svg"
          className="absolute -bottom-6 -right-16 hidden sm:inline-block pointer-events-none"
        />

        <Button size="xl" className="w-full">
          Start 7 days Free Trial
        </Button>

        <Button size="xl" className="w-full" variant="green-outline">
          Get in Touch with us
        </Button>
      </div>
    </Container>
  )
}
