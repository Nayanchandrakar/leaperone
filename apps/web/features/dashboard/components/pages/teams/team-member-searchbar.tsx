"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@app/ui/components/input-group"
import { SearchIcon } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"
import { useMemberSearch } from "@/features/dashboard/hooks/teams/use-member-search"

export function TeamMemberSearchBar() {
  const setQuery = useMemberSearch((state) => state.setQuery)
  const debounced = useDebounceCallback(setQuery, 300)

  return (
    <InputGroup className="rounded-full">
      <InputGroupInput
        onChange={(e) => debounced(e?.target?.value)}
        placeholder="Search team members by their name or job roles"
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
