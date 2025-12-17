import { Button } from "@app/ui/components/button"
import { Plus } from "lucide-react"
import { memo, useCallback } from "react"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContactOptionType } from "@/features/bussiness/types"
import { generateUUID } from "@/utils"

interface AddMoreContactIconsFormProps {
  index: number
}

export const AddMoreContactIconsForm = memo(({ index }: AddMoreContactIconsFormProps) => {
  const pushSubSectionItem = useContentEditorStore((state) => state.pushSubSectionItem)

  const handleSelect = useCallback(
    (type: ContactOptionType) => {
      pushSubSectionItem(index, ["contacts", "list"], {
        type,
        value: "",
        id: generateUUID(),
      })
    },
    [index, pushSubSectionItem],
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
