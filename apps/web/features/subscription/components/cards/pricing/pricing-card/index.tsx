"use client"

import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"
import { PriceActionButton } from "@/features/subscription/components/buttons/pricing/price-action-button"
import { BillingNote } from "@/features/subscription/components/cards/pricing/pricing-card/billing-note"
import { DisplayPrice } from "@/features/subscription/components/cards/pricing/pricing-card/display-price"
import { RenderPlanFeatures } from "@/features/subscription/components/cards/pricing/pricing-card/render-plan-features"
import { TeamPricingOptions } from "@/features/subscription/components/cards/pricing/pricing-card/team-pricing-options"
import type { Plan, SubscriptionInfo } from "@/features/subscription/types"
import { isTeamPlan } from "@/features/subscription/utils"

interface IPricingCard extends Plan {
  subscription: SubscriptionInfo
}

export const PricingCard = ({
  feature,
  title,
  pricing,
  header,
  buttonLink,
  type,
  subscription,
  billingNote,
}: IPricingCard) => {
  return (
    <div className="border-2 border-primary rounded-3xl mx-auto lg:max-w-full max-w-lg bg-background">
      <span className="border-b py-4 text-muted-foreground text-sm flex items-center justify-center gap-2.5">
        <header.Icon className="size-5" />
        {header.title}
      </span>

      <div className="py-6 px-7 sm:px-10">
        <div className="flex items-center justify-between gap-2 min-h-9">
          <h4 className="text-lg font-medium text-muted-foreground h-fit">
            {title}
          </h4>
          {isTeamPlan(type) && <TeamPricingOptions />}
        </div>

        <div className="flex my-7 gap-4 items-center">
          <DisplayPrice type={type} pricing={pricing} />
          <BillingNote billingNote={billingNote} />
        </div>

        <div className="space-y-3">
          <PriceActionButton type={type} subscription={subscription} />

          <Link
            href={buttonLink.href as any}
            className={buttonVariants({
              size: "xl",
              className: "w-full",
              variant: "green-outline",
            })}
          >
            {buttonLink.label}
          </Link>
        </div>

        <div className="mt-6">
          <span className="font-semibold text-base tracking-tight text-muted-foreground">
            {feature.title}
          </span>
          <RenderPlanFeatures feature={feature} />
        </div>
      </div>
    </div>
  )
}
