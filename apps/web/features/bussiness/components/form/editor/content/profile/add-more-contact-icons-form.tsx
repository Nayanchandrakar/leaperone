import { Button } from "@app/ui/components/button"
import type { ContentEditorSchema } from "@app/zod/types"
import { Plus } from "lucide-react"
import { useCallback } from "react"
import { withForm } from "@/components/ui/app-form"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import type { ContactOptionType } from "@/features/bussiness/types"
import { generateUUID } from "@/utils"

export const AddMoreContactIconsForm = withForm({
  props: {} as { sectionIdx: number },
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    const handleSelect = useCallback(
      (type: ContactOptionType) => {
        form.pushFieldValue(
          `sections[${sectionIdx}].contacts.list`,
          {
            type,
            value: "",
            id: generateUUID(),
          },
          {
            dontValidate: true,
          },
        )
      },
      [form, sectionIdx],
    )

    return (
      <DropdownSelectButton options={CONTACT_OPTIONS} onSelect={handleSelect}>
        <Button className="w-fit" variant="green-outline">
          <Plus />
          Add more contact icons
        </Button>
      </DropdownSelectButton>
    )
  },
})
