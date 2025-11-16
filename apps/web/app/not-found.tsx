import { buttonVariants } from "@app/ui/components/button"
import Image from "next/image"
import Link from "next/link"
import { RadialMesh } from "@/components/shared/mesh"
import { Marker } from "@/features/marketing/components/ui/marker"
import {
  MarketingDescription,
  MarketingHeader,
  MarketingTitle,
} from "@/features/marketing/components/ui/marketing-intro"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"

export default function NotFound() {
  return (
    <div className="container relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center">
      <RadialMesh />

      <MarketingHeader className="mt-0!">
        <Image priority width={270} height={270} src="/assets/svg/404.svg" alt="not-found" />

        <MarketingTitle>
          Oops!&nbsp;
          <UnderlineText>Page Not Found</UnderlineText>
        </MarketingTitle>

        <MarketingDescription className="max-w-lg">
          Sorry, we could not find the page you are looking for but you might want to:
        </MarketingDescription>

        <div className="relative w-full flex items-center justify-center flex-col gap-4 mx-auto max-w-lg">
          <Marker alt="marker" src="/assets/svg/open-mark.svg" className="-top-6 -left-16" />

          <Marker alt="marker" src="/assets/svg/close-mark.svg" className="-bottom-6 -right-16" />

          <Link href="/" className={buttonVariants({ size: "xl", className: "w-full" })}>
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
