import type { Testimonial } from "@app/core/types"
import { TestimonialCard } from "@/features/preview/components/cards/classic/testimonial-card"

interface TestimonialListProps {
  background: boolean
  testimonials: Testimonial[]
}

export const TestimonialList = ({ testimonials, background }: TestimonialListProps) => {
  if (testimonials?.length === 0) return null

  return testimonials.map((testimonial) => (
    <TestimonialCard key={testimonial.id} background={background} testimonial={testimonial} />
  ))
}
