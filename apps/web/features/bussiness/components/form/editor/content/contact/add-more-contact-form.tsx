import { Button } from "@app/ui/components/button"
import type { ContentEditorSchema } from "@app/zod/types"
import { Plus } from "lucide-react"
import { useCallback } from "react"
import { withForm } from "@/components/ui/app-form"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { CONTACT_INFO_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import type { ContactItemType } from "@/features/bussiness/types"
import { createContactItem } from "@/features/bussiness/utils/create-contact-item"

export const AddContactItemButtonForm = withForm({
  props: {} as { sectionIdx: number },
  defaultValues: {} as ContentEditorSchema,
  render: ({ form, sectionIdx }) => {
    const handleContactItemAdd = useCallback(
      (contactType: ContactItemType) => {
        const contactItem = createContactItem(contactType)
        form.pushFieldValue(`sections[${sectionIdx}].items`, contactItem, {
          dontValidate: true,
        })
      },
      [form, sectionIdx],
    )

    return (
      <DropdownSelectButton options={CONTACT_INFO_OPTIONS} onSelect={handleContactItemAdd}>
        <Button className="w-fit" variant="green-outline">
          <Plus />
          <span>Add more Contact info</span>
        </Button>
      </DropdownSelectButton>
    )
  },
})
