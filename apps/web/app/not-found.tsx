import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"
import React from "react"
import { Navbar } from "@/components/navbar"
import { FeedBackIcons } from "@/components/shared/feeedback-icons"
import { LegalFooter } from "@/components/shared/legal-footer"
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyHeading,
  EmptyTitle,
} from "@/components/ui/empty"

export default function NotFoundPage() {
  return (
    <React.Fragment>
      <Navbar />
      <Empty>
        <EmptyContent>
          <FeedBackIcons.warning className="size-28" />
          <EmptyHeading>
            <EmptyTitle>Oops! Page Not Found </EmptyTitle>
            <EmptyDescription>
              Sorry, we could not find the page you are looking for but you might want to:
            </EmptyDescription>
          </EmptyHeading>
          <EmptyActions>
            <Link href="/" className={buttonVariants({ size: "lg" })}>
              Create a Digital Business Card
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({
                size: "lg",
                variant: "green-outline",
                className: "bg-white hover:bg-white/90",
              })}
            >
              Explore Our Plans & Pricing
            </Link>
          </EmptyActions>
        </EmptyContent>
      </Empty>
      <LegalFooter />
    </React.Fragment>
  )
}
