import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/ui/components/accordion"
import { Plus } from "lucide-react"

interface IRenderFaqs {
  title: string
  data: Array<{
    question: string
    answer: string
  }>
}

export const RenderFaqs = ({ data, title }: IRenderFaqs) => {
  return (
    <div className="flex flex-col items-center justify-center last:mb-24">
      <h2 className="font-semibold tracking-tight text-2xl md:text-3xl">
        {title}
      </h2>
      <Accordion
        type="single"
        collapsible
        className="max-w-4xl mx-auto bg-background rounded-3xl border border-border my-12 p-4 space-y-3"
      >
        {data.map(({ question }, index) => (
          <AccordionItem key={question} value={`item-${index}`}>
            <AccordionTrigger>
              {question}
              <Plus className="text-muted-foreground pointer-events-none size-5 shrink-0 translate-y-0.5 transition-transform duration-200" />
            </AccordionTrigger>
            <AccordionContent>{question}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
