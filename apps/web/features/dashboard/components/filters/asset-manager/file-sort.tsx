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
import { FILE_SORTS } from "@/features/dashboard/constants/asset-manager/filter-options"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import type { SortOptions } from "@/features/dashboard/types"

interface FileSortFilterProps {
  isDisabled: boolean
}

export const FileSortFilter = ({ isDisabled }: FileSortFilterProps) => {
  const { setSortOptions, sortOptions } = useAssetFilterStore(
    useShallow((state) => ({
      sortOptions: state.sortOptions,
      setSortOptions: state.setSortOptions,
    })),
  )

  return (
    <SortFilterBar>
      <SortFilterBarLabel>Sort by:</SortFilterBarLabel>
      <Select
        disabled={isDisabled}
        defaultValue={sortOptions}
        onValueChange={(type: SortOptions) => setSortOptions(type)}
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
