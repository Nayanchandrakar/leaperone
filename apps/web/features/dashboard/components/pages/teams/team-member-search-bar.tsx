import { InputGroup, InputGroupAddon, InputGroupInput } from "@app/ui/components/input-group"
import { SearchIcon } from "lucide-react"

export const TeamMemberSearchBar = () => {
  return (
    <InputGroup className="rounded-full">
      <InputGroupInput placeholder="Search team members by their name or job roles" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
