import { Button } from "@app/ui/components/button"
import type { ContentEditorSchema } from "@app/zod/types"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { withForm } from "@/components/ui/app-form"
import { generateUUID } from "@/utils"

interface AddTestimonialFormProps {
  sectionIdx: number
}

export const AddTestimonialForm = withForm({
  props: {} as AddTestimonialFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    const handleAddTestimonial = useCallback(() => {
      form.pushFieldValue(`sections[${sectionIdx}].testimonials`, {
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
    }, [form, sectionIdx])

    return (
      <Button variant="green-outline" className="w-fit" onClick={handleAddTestimonial}>
        <PlusIcon className="w-4 h-4" />
        Add another Testimonial
      </Button>
    )
  },
})
