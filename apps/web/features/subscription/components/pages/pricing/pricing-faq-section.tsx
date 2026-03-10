import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/ui/components/accordion"
import { Plus } from "lucide-react"
import { UnderlineText } from "@/features/marketing/components/ui/underline-text"
import { PLAN_FAQS } from "@/features/subscription/constants/pricing/plan-faqs"

export function PricingFaqSection() {
  return (
    <section className="container mt-28">
      <h2 className="font-bold md:font-semibold text-3xl text-center  leading-tight">
        <UnderlineText>FAQs About Plans & Pricing</UnderlineText>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="max-w-5xl mx-auto bg-background rounded-3xl border border-border mt-12 p-4 space-y-3"
      >
        {PLAN_FAQS.map(({ question }, index) => (
          <AccordionItem key={question} value={`item-${index}`}>
            <AccordionTrigger>
              {question}
              <Plus className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent>{question}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
