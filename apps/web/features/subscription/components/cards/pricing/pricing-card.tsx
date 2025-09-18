import { Button } from "@app/ui/components/button"
import { BadgeCheck } from "lucide-react"
import { ListComponent } from "@/components/shared/list-component"
import { CountingNumber } from "@/features/subscription/components/ui/counting-number"
import type { IPlans, PlanInterval } from "@/features/subscription/types"

interface IPricingCard extends IPlans {
  currentInterval: PlanInterval
}

export const PricingCard = ({
  feature,
  name,
  pricing,
  users,
  currentInterval,
}: IPricingCard) => {
  const { title, Icon } = users
  const { billingNote, price } = pricing[currentInterval]

  return (
    <div className="border-2 border-primary rounded-3xl mx-auto lg:max-w-full max-w-lg bg-background">
      <span className="border-b py-4 text-gray-500 text-sm flex items-center justify-center gap-2.5 ">
        <Icon className="size-5" />
        {title}
      </span>

      <div className="py-6 px-7 sm:px-10">
        <div>
          <h4 className="text-lg font-semibold text-gray-600">{name}</h4>
        </div>

        <div className="flex my-7 gap-3 leading-tight items-center">
          <CountingNumber
            from={0}
            to={price}
            duration={1.5}
            className="text-5xl font-semibold text-black"
            format={(value) => `$${value.toFixed(2)}`}
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

          <ListComponent
            items={feature.details}
            className="space-y-3 mt-5"
            renderItem={(feature) => (
              <div key={feature} className="flex gap-3 items-start">
                <BadgeCheck className="size-7 shrink-0 -mt-0.5 fill-primary stroke-white " />
                <p className="font-normal text-base text-gray-600">{feature}</p>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  )
}
