import type { Contact } from "@app/core/types"
import { Button } from "@app/ui/components/button"
import { Plus } from "lucide-react"
import { memo, useCallback } from "react"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useSubSectionList } from "@/features/bussiness/hooks/use-subsection-list"
import type { ContactOptionType, ContentSectionProps } from "@/features/bussiness/types"
import { generateUUID } from "@/utils"

export const AddMoreContactIconsForm = memo(({ index }: ContentSectionProps) => {
  const { addItem } = useSubSectionList<Contact>(index, ["contacts", "list"])
  const handleSelect = useCallback(
    (type: ContactOptionType) => {
      addItem({
        type,
        value: "",
        id: generateUUID(),
      })
    },
    [addItem],
  )

  return (
    <DropdownSelectButton options={CONTACT_OPTIONS} onSelect={handleSelect}>
      <Button className="w-fit" variant="green-outline">
        <Plus />
        Add more contact icons
      </Button>
    </DropdownSelectButton>
  )
})
