"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useShallow } from "zustand/react/shallow"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"
import { FILE_CATEGORIES } from "@/features/dashboard/constants/asset-manager/filter-options"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import type { FileCategory } from "@/features/dashboard/types"

export const FileCategoryFilter = () => {
  const { fileCategory, setFileCategory } = useAssetFilterStore(
    useShallow((state) => ({
      fileCategory: state.fileCategory,
      setFileCategory: state.setFileCategory,
    })),
  )

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Type:</SortFilterBarLabel>
      <Select
        defaultValue={fileCategory}
        onValueChange={(type: FileCategory) => setFileCategory(type)}
      >
        <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {FILE_CATEGORIES.map(({ title, value }) => (
              <SelectItem key={value} value={value}>
                {title} (5)
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </SortFilterBar>
  )
}
