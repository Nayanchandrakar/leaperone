import type { TestimonialsSection } from "@app/core/types"
import { useMemo } from "react"
import { TestimonialList } from "@/features/preview/components/templates/classic/testimonials/testimonial-list"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

type TestimonialSectionProps = {
  content: TestimonialsSection
}

export const TestimonialSection = ({ content }: TestimonialSectionProps) => {
  const { heading, description, background, testimonials } = content

  const headingContent = useMemo(
    () => (heading?.enabled && heading?.text ? heading.text : null),
    [heading?.enabled, heading?.text],
  )

  const descriptionContent = useMemo(
    () => (description?.enabled && description?.text ? description.text : null),
    [description?.enabled, description?.text],
  )

  return (
    <article className="space-y-2">
      {(headingContent || descriptionContent) && (
        <SectionRoot background={background} className="py-7 px-8">
          <SectionHeader>
            {headingContent && <SectionTitle>{headingContent}</SectionTitle>}
            {descriptionContent && <SectionDescription>{descriptionContent}</SectionDescription>}
          </SectionHeader>
        </SectionRoot>
      )}
      <TestimonialList testimonials={testimonials} background={background} />
    </article>
  )
}
