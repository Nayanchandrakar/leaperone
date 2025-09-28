import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/ui/components/accordion"
import { Button } from "@app/ui/components/button"
import { ChevronDown } from "lucide-react"
import { Container } from "@/components/shared/container"
import { ListComponent } from "@/components/shared/list-component"
import { MarkerText } from "@/features/marketing/components/ui/marker-text"
import { PriceCompareCard } from "@/features/subscription/components/cards/pricing/price-compare-card"
import {
  COMPARISON_PLANS,
  PLAN_COMPARISON_DATA,
} from "@/features/subscription/constants/pricing/plan-compare"
import type { SubscriptionInfo } from "@/features/subscription/types"

interface IComparePlanSection {
  subscription: SubscriptionInfo
}

export const ComparePlanSection = ({ subscription }: IComparePlanSection) => {
  console.log(subscription)
  return (
    <Container className="mt-32" id="compare-pricing">
      <h2 className="font-bold md:font-semibold text-3xl text-center leading-tight">
        <MarkerText
          alt="underline"
          style={{ top: "80%" }}
          className="inline-flex"
          src="/assets/svg/dash.svg"
        >
          Compare plans with all features
        </MarkerText>
      </h2>

      <ListComponent
        className="grid sm:grid-cols-2 lg:grid-cols-3 mt-20 border border-border lg:max-w-5xl mx-auto rounded-3xl bg-background divide-y lg:divide-y-0 sm:divide-x divide-x-0 divide-border"
        items={COMPARISON_PLANS}
        renderItem={({ title }) => {
          return (
            <div
              key={title}
              className="py-14 flex flex-col gap-3 items-center justify-center lg:nth-[1]:flex nth-[1]:hidden"
            >
              <span className="font-medium text-lg">{title}</span>
              <Button variant={undefined} size="lg">
                Choose Plan
              </Button>
            </div>
          )
        }}
      />

      <Accordion
        defaultValue={PLAN_COMPARISON_DATA.map(
          (_, index) => `compare-plan-${index}`,
        )}
        type="multiple"
        className="max-w-5xl mx-auto bg-background rounded-3xl border border-border mt-12 p-4 space-y-3"
      >
        {PLAN_COMPARISON_DATA.map(({ features, section }, index) => (
          <AccordionItem key={section} value={`compare-plan-${index}`}>
            <AccordionTrigger>
              {section}
              <ChevronDown className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200" />
            </AccordionTrigger>

            <AccordionContent className="space-y-4 px-0 py-4">
              {features.map((data) => (
                <PriceCompareCard key={data.name} {...data} />
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}
