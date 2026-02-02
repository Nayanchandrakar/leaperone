import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"
import { FeedBackIcons } from "@/components/shared/feeedback-icons"
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyHeading,
  EmptyTitle,
} from "@/components/ui/empty"

export default function SubscriptionCancelledPage() {
  return (
    <Empty>
      <EmptyContent>
        <FeedBackIcons.warning className="size-28" />
        <EmptyHeading>
          <EmptyTitle>Your Subscription was Cancelled!</EmptyTitle>
          <EmptyDescription>
            You had cancelled the subscription earlier. To continue your Leaper One journey, please
            purchase a plan.
          </EmptyDescription>
        </EmptyHeading>

        <EmptyActions>
          <Link href="/pricing" className={buttonVariants({ size: "lg" })}>
            Renew / Switch Plan
          </Link>

          <Link
            href="/contact"
            className={buttonVariants({
              size: "lg",
              variant: "green-outline",
              className: "bg-white hover:bg-white/90",
            })}
          >
            Contact Support
          </Link>
        </EmptyActions>
      </EmptyContent>
    </Empty>
  )
}
