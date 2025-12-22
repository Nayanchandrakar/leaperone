import type { TestimonialMember } from "@app/core/types"
import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import { generateUUID } from "@/utils"

interface AddTestimonialFormProps {
  index: number
}

export function AddTestimonialForm({ index }: AddTestimonialFormProps) {
  const { addItem } = useSubSectionList<TestimonialMember>(index, ["testimonials"])

  const handleAddTestimonial = useCallback(() => {
    addItem({
      id: generateUUID(),
      authorName: "",
      authorDesignation: "",
      authorProfile: {
        enabled: false,
        imageSrc: "https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg",
      },
      testimonialText: {
        text: "",
        enabled: false,
      },
    })
  }, [addItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddTestimonial}>
      <PlusIcon className="w-4 h-4" />
      Add another Testimonial
    </Button>
  )
}
