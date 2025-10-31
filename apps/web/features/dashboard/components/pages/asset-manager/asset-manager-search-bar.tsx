"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@app/ui/components/input-group"
import { SearchIcon } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"
import { useFileStorage } from "@/features/dashboard/hooks/asset-manager/use-file-store"

export const AssetManagerSearchBar = () => {
  const setSearchQuery = useFileStorage((state) => state.setSearchQuery)
  const debounced = useDebounceCallback(setSearchQuery, 400)

  return (
    <InputGroup className="rounded-full max-w-lg">
      <InputGroupInput
        type="text"
        placeholder="Search your uploaded images"
        onChange={(e) => debounced(e?.target?.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
