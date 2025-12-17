import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { generateUUID } from "@/utils"

interface AddTeamMemberFormProps {
  index: number
}

export function AddTeamMemberForm({ index }: AddTeamMemberFormProps) {
  const pushSubSectionItem = useContentEditorStore((state) => state.pushSubSectionItem)

  const handleAddTeamMember = useCallback(() => {
    pushSubSectionItem(index, ["members"], {
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
  }, [index, pushSubSectionItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddTeamMember}>
      <PlusIcon className="w-4 h-4" />
      Add another Teammate
    </Button>
  )
}
