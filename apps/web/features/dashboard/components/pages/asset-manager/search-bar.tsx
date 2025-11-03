"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@app/ui/components/input-group"
import { useIsFetching } from "@tanstack/react-query"
import { SearchIcon } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"

export const SearchBar = () => {
  const isFetching = useIsFetching({ queryKey: ["files"] })
  const setQuery = useAssetFilterStore((state) => state.setQuery)
  const debounced = useDebounceCallback(setQuery, 400)

  return (
    <InputGroup className="rounded-full sm:max-w-lg">
      <InputGroupInput
        disabled={!!isFetching}
        placeholder="Search your uploaded images"
        onChange={(e) => debounced(e?.target?.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}
