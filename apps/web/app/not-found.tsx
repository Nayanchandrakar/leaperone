import { buttonVariants } from "@app/ui/components/button"
import Image from "next/image"
import Link from "next/link"
import { RadialMesh } from "@/components/shared/mesh"
import { Marker } from "@/features/marketing/components/ui/marker"
import { MarkerText } from "@/features/marketing/components/ui/marker-text"
import {
  MarketingHeader,
  MarketingHeaderDescription,
  MarketingHeaderTitle,
} from "@/features/marketing/components/ui/marketing-intro"

export default function NotFound() {
  return (
    <div className="container relative w-full min-h-[calc(100vh_-_64px)] flex items-center justify-center">
      <RadialMesh />

      <MarketingHeader className="!mt-0">
        <Image
          priority
          width={270}
          height={270}
          src="/assets/svg/404.svg"
          alt="not-found"
        />

        <MarketingHeaderTitle>
          Oops!&nbsp;
          <MarkerText
            alt="underline"
            style={{ top: "63%" }}
            className="inline-flex"
            src="/assets/svg/dash.svg"
          >
            Page Not Found
          </MarkerText>
        </MarketingHeaderTitle>

        <MarketingHeaderDescription className="max-w-lg">
          Sorry, we could not find the page you are looking for but you might
          want to:
        </MarketingHeaderDescription>

        <div className="relative w-full flex items-center justify-center flex-col gap-4 mx-auto max-w-lg">
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
      </MarketingHeader>
    </div>
  )
}
