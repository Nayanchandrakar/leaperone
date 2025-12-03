import { Button } from "@app/ui/components/button"
import type { ContentEditorSchema } from "@app/zod/types"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { withForm } from "@/components/ui/app-form"
import { generateUUID } from "@/utils"

interface AddImageLinksFormProps {
  sectionIdx: number
}

export const AddImageLinksForm = withForm({
  props: {} as AddImageLinksFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    const handleAddImage = useCallback(() => {
      form.pushFieldValue(`sections[${sectionIdx}].images`, {
        id: generateUUID(),
        imageSrc: "https://images.pexels.com/photos/7004737/pexels-photo-7004737.jpeg",
        title: "",
        link: "",
      })
    }, [form, sectionIdx])
    return (
      <Button variant="green-outline" className="w-fit" onClick={handleAddImage}>
        <PlusIcon className="w-4 h-4" />
        Add another Image
      </Button>
    )
  },
})
