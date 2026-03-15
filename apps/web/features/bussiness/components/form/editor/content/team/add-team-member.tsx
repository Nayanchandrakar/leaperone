import type { TeamMember } from "@app/types"
import { Button } from "@app/ui/components/button"
import { PlusIcon } from "lucide-react"
import { useCallback } from "react"
import { useSubSectionList } from "@/features/bussiness/hooks/home/use-subsection-list"
import { generateUUID } from "@/utils"

interface AddTeamMemberFormProps {
  index: number
}

export function AddTeamMemberForm({ index }: AddTeamMemberFormProps) {
  const { addItem } = useSubSectionList<TeamMember>(index, ["members"])

  const handleAddTeamMember = useCallback(() => {
    addItem({
      id: generateUUID(),
      name: "Ben T.",
      designation: "Designation",
      profile: {
        imageSrc: "https://images.pexels.com/photos/29647834/pexels-photo-29647834.jpeg",
        enabled: true,
      },
      description: {
        text: "",
        enabled: true,
      },
    })
  }, [addItem])

  return (
    <Button variant="green-outline" className="w-fit" onClick={handleAddTeamMember}>
      <PlusIcon className="w-4 h-4" />
      Add another Teammate
    </Button>
  )
}
