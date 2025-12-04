import { Button } from "@app/ui/components/button"
import type { ContentEditorSchema } from "@app/zod/types"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { withForm } from "@/components/ui/app-form"
import { generateUUID } from "@/utils"

interface AddTeamMemberFormProps {
  sectionIdx: number
}

export const AddTeamMemberForm = withForm({
  props: {} as AddTeamMemberFormProps,
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    const handleAddTeamMember = useCallback(() => {
      form.pushFieldValue(`sections[${sectionIdx}].members`, {
        id: generateUUID(),
        memberName: "",
        memberDesignation: "",
        memberProfile: {
          enabled: false,
          imageSrc: "https://images.pexels.com/photos/4585185/pexels-photo-4585185.jpeg",
        },
        memberDescription: {
          text: "",
          enabled: false,
        },
      })
    }, [form, sectionIdx])

    return (
      <Button variant="green-outline" className="w-fit" onClick={handleAddTeamMember}>
        <PlusIcon className="w-4 h-4" />
        Add another Teammate
      </Button>
    )
  },
})
