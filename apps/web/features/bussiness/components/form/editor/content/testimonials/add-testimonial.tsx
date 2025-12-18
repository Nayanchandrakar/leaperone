import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { generateUUID } from "@/utils"

interface AddTestimonialFormProps {
  index: number
}

export function AddTestimonialForm({ index }: AddTestimonialFormProps) {
  const pushSubSectionItem = useContentEditorStore((state) => state.pushSubSectionItem)

  const handleAddTestimonial = useCallback(() => {
    pushSubSectionItem(index, ["testimonials"], {
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
  }, [index, pushSubSectionItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddTestimonial}>
      <PlusIcon className="w-4 h-4" />
      Add another Testimonial
    </Button>
  )
}
