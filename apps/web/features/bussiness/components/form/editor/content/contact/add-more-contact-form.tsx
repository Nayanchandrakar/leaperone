import { Button } from "@app/ui/components/button"
import { Plus } from "lucide-react"
import { useCallback } from "react"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { CONTACT_INFO_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContactItemType } from "@/features/bussiness/types"
import { createContactItem } from "@/features/bussiness/utils/create-contact-item"

interface AddContactItemButtonFormProps {
  sectionIdx: number
}

export function AddContactItemButtonForm({ sectionIdx }: AddContactItemButtonFormProps) {
  const pushItem = useContentEditorStore((state) => state.pushItem)

  const handleContactItemAdd = useCallback(
    (contactType: ContactItemType) => {
      const contactItem = createContactItem(contactType)
      pushItem(sectionIdx, ["items"], contactItem)
    },
    [sectionIdx, pushItem],
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
