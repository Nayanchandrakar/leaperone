"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@app/ui/components/input-group"
import { cn } from "@app/ui/lib/utils"
import { SearchIcon } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"
import { FileUploadButton } from "@/features/dashboard/components/buttons/asset-manager/file-upload-button"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"

function SearchBar() {
  const setQuery = useAssetFilterStore((state) => state.setQuery)
  const debounced = useDebounceCallback(setQuery, 400)

  return (
    <InputGroup className="rounded-full sm:max-w-lg">
      <InputGroupInput
        placeholder="Search your uploaded images"
        onChange={(e) => debounced(e?.target?.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}

export function AssetToolBar({ className }: { className?: string }) {
  return (
    <div className={cn("mt-8 flex flex-col sm:flex-row justify-between gap-4", className)}>
      <SearchBar />
      <FileUploadButton />
    </div>
  )
}
