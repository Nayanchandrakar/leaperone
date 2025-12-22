import type { ContactItem } from "@app/core/types"
import { Button } from "@app/ui/components/button"
import { Plus } from "lucide-react"
import { useCallback } from "react"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { CONTACT_INFO_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import type { ContactItemType } from "@/features/bussiness/types"
import { createContactItem } from "@/features/bussiness/utils/create-contact-item"

interface AddContactItemButtonFormProps {
  index: number
}

export function AddContactItemButtonForm({ index }: AddContactItemButtonFormProps) {
  const { addItem } = useSubSectionList<ContactItem>(index, ["items"])

  const handleContactItemAdd = useCallback(
    (contactType: ContactItemType) => {
      const contactItem = createContactItem(contactType)
      addItem(contactItem)
    },
    [addItem],
  )

  return (
    <DropdownSelectButton options={CONTACT_INFO_OPTIONS} onSelect={handleContactItemAdd}>
      <Button className="w-fit" variant="green-outline">
        <Plus />
        <span>Add more Contact info</span>
      </Button>
    </DropdownSelectButton>
  )
}
