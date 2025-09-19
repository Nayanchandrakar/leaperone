import { Button } from "@app/ui/components/button"
import { DisplayPrice } from "@/features/subscription/components/cards/pricing/pricing-card/display-price"
import { PricingTierSelect } from "@/features/subscription/components/cards/pricing/pricing-card/pricing-tier-select"
import { RenderPlanFeatures } from "@/features/subscription/components/cards/pricing/pricing-card/render-plan-features"
import type { IPlans, PlanInterval } from "@/features/subscription/types"
import { isTeamPricing } from "@/features/subscription/utils"

interface IPricingCard extends IPlans {
  currentInterval: PlanInterval
}

export const PricingCard = ({
  feature,
  name,
  pricing,
  users,
  currentInterval,
  id,
}: IPricingCard) => {
  const { billingNote, price } = pricing[currentInterval]

  return (
    <div className="border-2 border-primary rounded-3xl mx-auto lg:max-w-full max-w-lg bg-background">
      <span className="border-b py-4 text-gray-500 text-sm flex items-center justify-center gap-2.5 ">
        <users.Icon className="size-5" />
        {users.title}
      </span>

      <div className="py-6 px-7 sm:px-10">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-lg font-semibold text-gray-600">{name}</h4>
          {isTeamPricing(id) && <PricingTierSelect />}
        </div>

        <div className="flex my-7 gap-3 leading-tight items-center">
          <DisplayPrice
            planId={id}
            individualPrice={price}
            currentInterval={currentInterval}
          />
          <p
            dangerouslySetInnerHTML={{ __html: billingNote }}
            className="font-normal text-sm text-muted-foreground text-start"
          />
        </div>

        <div className="space-y-3">
          <Button className="w-full font-semibold " size="xl">
            Start 7 days Free Trial
          </Button>

          <Button className="w-full" size="xl" variant="green-outline">
            See Pricing by Team Size
          </Button>
        </div>

        <div className="mt-6 space-y-3">
          <span className="font-semibold text-lg text-gray-600">
            {feature.title}
          </span>
          <RenderPlanFeatures feature={feature} />
        </div>
      </div>
    </div>
  )
}
