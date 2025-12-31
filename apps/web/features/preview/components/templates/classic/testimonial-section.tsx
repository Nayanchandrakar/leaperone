import type { TestimonialsSection } from "@app/core/types"

type TestimonialSectionProps = {
  content: TestimonialsSection
}

export const TestimonialSection = ({ content }: TestimonialSectionProps) => {
  if (content?.enabled) return
  return <div>Teams section</div>
}
