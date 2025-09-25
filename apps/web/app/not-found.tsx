import { buttonVariants } from "@app/ui/components/button"
import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/shared/container"
import { RadialMesh } from "@/components/shared/mesh"
import {
  MarketingDescription,
  MarketingIntro,
  MarketingTitle,
} from "@/components/ui/marketing-intro"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"

export default function NotFound() {
  return (
    <Container className="relative w-full min-h-[calc(100vh_-_64px)] flex items-center justify-center">
      <RadialMesh />

      <MarketingIntro className="!mt-0">
        <Image
          width={300}
          height={300}
          src="/assets/svg/404.svg"
          alt="not-found"
          priority
        />

        <MarketingTitle>
          Oops!&nbsp;
          <MarkerText
            alt="underline"
            style={{ top: "63%" }}
            className="inline-flex"
            src="/assets/svg/dash.svg"
          >
            Page Not Found
          </MarkerText>
        </MarketingTitle>

        <MarketingDescription className="max-w-lg">
          Sorry, we could not find the page you are looking for but you might
          want to:
        </MarketingDescription>

        <div className="relative w-full flex items-center justify-center flex-col gap-4 mx-auto max-w-lg">
          <Image
            width={50}
            height={50}
            alt="marker"
            src="/assets/svg/open-mark.svg"
            className="absolute -top-6 -left-16 hidden sm:inline-block pointer-events-none"
          />

          <Image
            width={50}
            height={50}
            alt="marker"
            src="/assets/svg/close-mark.svg"
            className="absolute -bottom-6 -right-16 hidden sm:inline-block pointer-events-none"
          />

          <Link
            href="/"
            className={buttonVariants({ size: "xl", className: "w-full" })}
          >
            Create a Digital Business Card
          </Link>

          <Link
            href="/pricing"
            className={buttonVariants({
              size: "xl",
              className: "w-full",
              variant: "green-outline",
            })}
          >
            Explore Our Plans & Pricing
          </Link>
        </div>
      </MarketingIntro>
    </Container>
  )
}
