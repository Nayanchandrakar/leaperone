import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useContentEditorStore } from "@/features/bussiness/stores/use-content-editor-store"
import { generateUUID } from "@/utils"

interface AddTeamMemberFormProps {
  sectionIdx: number
}

export function AddTeamMemberForm({ sectionIdx }: AddTeamMemberFormProps) {
  const pushItem = useContentEditorStore((state) => state.pushItem)

  const handleAddTeamMember = useCallback(() => {
    pushItem(sectionIdx, ["members"], {
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
  }, [sectionIdx, pushItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddTeamMember}>
      <PlusIcon className="w-4 h-4" />
      Add another Teammate
    </Button>
  )
}
