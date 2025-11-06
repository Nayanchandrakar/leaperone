import { Button } from "@app/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@app/ui/components/dropdown-menu"
import { ChevronDown } from "lucide-react"

export const BussinessCardMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="gray-outline" size="sm">
          Business Card Actions
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-(--radix-dropdown-menu-trigger-width)">
        <DropdownMenuItem>View card</DropdownMenuItem>
        <DropdownMenuItem>Create/Edit card</DropdownMenuItem>
        <DropdownMenuItem>Delete card</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
