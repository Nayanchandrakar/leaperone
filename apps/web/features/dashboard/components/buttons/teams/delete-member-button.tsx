import { DropdownMenuItem } from "@app/ui/components/dropdown-menu"
import { Trash2 } from "lucide-react"

export function DeleteMemberButton() {
  return (
    <DropdownMenuItem variant="destructive">
      <Trash2 />
      Delete
    </DropdownMenuItem>
  )
}
