"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/ui/components/smooth-accordion"
import { ChevronDown } from "lucide-react"

export default function SmoothAccordion() {
  return (
    <section className="mt-8 container space-y-4">
      <Accordion type="single" collapsible>
        <AccordionItem value="email-report">
          <AccordionTrigger>
            Email me Scan Report of my card
            <ChevronDown className="size-4 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quos quam nulla
            pariatur harum quibusdam! Cumque id qui adipisci nisi enim, itaque nesciunt. Asperiores
            ullam quod nostrum commodi ducimus? Cumque unde ad doloribus reprehenderit sequi
            veritatis pariatur neque amet. Repellat obcaecati veniam distinctio blanditiis quas
            dignissimos aspernatur nihil aperiam assumenda minus dolores ex velit magni tempora ea
            illo neque voluptas asperiores sunt suscipit deserunt deleniti, a nam. Minima cumque
            quia eveniet animi amet esse voluptatum! Animi expedita assumenda voluptatum eum ad
            voluptatem et. Exercitationem ut aliquam reprehenderit aperiam, quos alias vel sint
            numquam similique eaque temporibus minus asperiores possimus mollitia dolores tempora
            aspernatur dignissimos! Suscipit quo assumenda sed aliquam aperiam
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="email-test">
          <AccordionTrigger>
            Email me Scan Report of my card
            <ChevronDown className="size-4 transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quos quam nulla
            pariatur harum quibusdam! Cumque id qui adipisci nisi enim, itaque nesciunt. Asperiores
            ullam quod nostrum commodi ducimus? Cumque unde ad doloribus reprehenderit sequi
            veritatis pariatur neque amet. Repellat obcaecati veniam distinctio blanditiis quas
            dignissimos aspernatur nihil aperiam assumenda minus dolores ex velit magni tempora ea
            illo neque voluptas asperiores sunt suscipit deserunt deleniti, a nam. Minima cumque
            quia eveniet animi amet esse voluptatum! Animi expedita assumenda voluptatum eum ad
            voluptatem et. Exercitationem ut aliquam reprehenderit aperiam, quos alias vel sint
            numquam similique eaque temporibus minus asperiores possimus mollitia dolores tempora
            aspernatur dignissimos! Suscipit quo assumenda sed aliquam aperiam
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
