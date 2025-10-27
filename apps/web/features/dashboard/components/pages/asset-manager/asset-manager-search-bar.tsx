import { InputGroup, InputGroupAddon, InputGroupInput } from "@app/ui/components/input-group"
import { SearchIcon } from "lucide-react"

export const AssetManagerSearchBar = () => {
  return (
    <InputGroup className="rounded-full max-w-lg">
      <InputGroupInput placeholder="Search your uploaded images" />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
