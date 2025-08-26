import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@myleaper/ui/components/accordion"
import { Container } from "@/components/shared/container"
import { MarkerText } from "@/features/bussiness/components/ui/marker-text"
import { PLAN_FAQS } from "@/features/subscription/constants/pricing/plan-faqs"

export const PricingFaqSection = () => {
  return (
    <Container className="mt-28">
      <h2 className="font-bold md:font-semibold text-3xl text-center  leading-tight ">
        <MarkerText
          alt="underline"
          style={{ top: "80%" }}
          className="inline-flex"
          src="/assets/markers/dash.svg"
        >
          FAQs About Plans & Pricing
        </MarkerText>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="max-w-5xl mx-auto my-4 mt-20 bg-background px-6 sm:px-8 py-0 sm:py-1 rounded-2xl border border-border"
      >
        {PLAN_FAQS.map(({ answer, question }, index) => (
          <AccordionItem
            key={question}
            value={`item-${index}`}
            className="py-3"
          >
            <AccordionTrigger className="text-base sm:text-lg cursor-pointer">
              {question}
            </AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}
