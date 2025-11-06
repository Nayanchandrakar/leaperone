import { Button } from "@app/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { ChevronDown } from "lucide-react"

export const MemberDeleteMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="gray-outline" size="sm">
          Delete
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Delete account with all data</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
