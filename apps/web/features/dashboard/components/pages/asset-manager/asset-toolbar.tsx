"use client"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@app/ui/components/input-group"
import { cn } from "@app/ui/lib/utils"
import { SearchIcon } from "lucide-react"
import { useDebounceCallback } from "usehooks-ts"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"

export function AssetSearchInput() {
  const {
    actions: { dispatch },
    meta: { searchPlaceholder },
  } = useAssetComposer()

  const debounced = useDebounceCallback(
    (payload) => dispatch({ type: "set-search-query", payload }),
    400,
  )

  return (
    <InputGroup className="rounded-full sm:max-w-lg">
      <InputGroupInput
        placeholder={searchPlaceholder}
        onChange={(e) => debounced(e?.target?.value)}
      />
      <InputGroupAddon>
        <SearchIcon />
      </InputGroupAddon>
    </InputGroup>
  )
}

export function AssetToolbar({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("mt-8 flex flex-col sm:flex-row justify-between gap-4", className)}>
      {children}
    </div>
  )
}
