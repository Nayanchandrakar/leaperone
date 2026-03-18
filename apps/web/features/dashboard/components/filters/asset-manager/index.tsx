"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { cn } from "@app/ui/lib/utils"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"
import { FILE_SORTS, FILE_TYPES } from "@/features/dashboard/constants/asset-manager/filter-options"
import { useAssetComposer } from "@/features/dashboard/hooks/asset-manager/use-asset-composer"
import type { FileType } from "@/features/dashboard/types"
import { isAssetFilterDisabled } from "@/features/dashboard/utils/asset-manager"

export function AssetSelectedCount() {
  const {
    state: { selectedAssets },
  } = useAssetComposer()

  const count = selectedAssets.length

  if (count === 0) return null

  return <span className="font-normal text-base text-primary">{count} selected</span>
}

export function AssetFilters({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return <div className={cn("mt-8 flex flex-wrap items-center gap-4", className)}>{children}</div>
}

export function AssetFileTypeSelector() {
  const {
    state: { fileType, isFetching, filesCount },
    actions: { dispatch },
  } = useAssetComposer()

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Type:</SortFilterBarLabel>
      <Select
        value={fileType}
        onValueChange={(payload) => {
          dispatch({ type: "set-file-type", payload: payload as FileType })
        }}
        disabled={isAssetFilterDisabled(fileType, isFetching, filesCount)}
      >
        <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {FILE_TYPES.map(({ title, value }) => (
              <SelectItem key={value} value={value}>
                {title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SortFilterBar>
  )
}

export function AssetSortSelector() {
  const {
    actions: { dispatch },
    state: { sortBy, isFetching, filesCount, fileType },
  } = useAssetComposer()

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Sort By:</SortFilterBarLabel>
      <Select
        value={sortBy}
        onValueChange={(payload) => dispatch({ type: "set-sort-by", payload })}
        disabled={isAssetFilterDisabled(fileType, isFetching, filesCount)}
      >
        <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {FILE_SORTS.map(({ title, value }) => (
              <SelectItem key={value} value={value}>
                {title}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SortFilterBar>
  )
}
