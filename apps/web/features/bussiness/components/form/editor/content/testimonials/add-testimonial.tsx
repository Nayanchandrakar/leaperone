import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { generateUUID } from "@/utils"

interface AddTestimonialFormProps {
  sectionIdx: number
}

export function AddTestimonialForm({ sectionIdx }: AddTestimonialFormProps) {
  const pushItem = useContentEditorStore((state) => state.pushItem)

  const handleAddTestimonial = useCallback(() => {
    pushItem(sectionIdx, ["testimonials"], {
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
  }, [sectionIdx, pushItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddTestimonial}>
      <PlusIcon className="w-4 h-4" />
      Add another Testimonial
    </Button>
  )
}
