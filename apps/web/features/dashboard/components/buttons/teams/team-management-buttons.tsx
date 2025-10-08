import { Button } from "@app/ui/components/button"
import { Plus, Settings } from "lucide-react"

export const TeamManagementButtons = () => {
  return (
    <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3 min-[1100px]:w-fit">
      <Button type="button">
        <Plus className="size-4" />
        <span>Add Team Member</span>
      </Button>

      <Button type="button" variant="green-outline">
        <Settings className="size-4" />
        <span>Team Settings</span>
      </Button>
    </div>
  )
}
