import { Button } from "@app/ui/components/button"
import { Plus } from "lucide-react"
import { useCallback } from "react"
import { DropdownSelectButton } from "@/features/bussiness/components/buttons/home/dropdown-select-button"
import { CONTACT_OPTIONS } from "@/features/bussiness/constants/home/editor-options"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import type { ContactOptionType } from "@/features/bussiness/types"
import { generateUUID } from "@/utils"

interface AddMoreContactIconsFormProps {
  sectionIdx: number
}

export function AddMoreContactIconsForm({ sectionIdx }: AddMoreContactIconsFormProps) {
  const pushItem = useContentEditorStore((state) => state.pushItem)

  const handleSelect = useCallback(
    (type: ContactOptionType) => {
      pushItem(sectionIdx, ["contacts", "list"], {
        type,
        value: "",
        id: generateUUID(),
      })
    },
    [sectionIdx, pushItem],
  )

  return (
    <DropdownSelectButton options={CONTACT_OPTIONS} onSelect={handleSelect}>
      <Button className="w-fit" variant="green-outline">
        <Plus />
        Add more contact icons
      </Button>
    </DropdownSelectButton>
  )
}
