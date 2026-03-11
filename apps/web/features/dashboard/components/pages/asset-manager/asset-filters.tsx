"use client"

import { cn } from "@app/ui/lib/utils"
import { DeleteFilesButton } from "@/features/dashboard/components/buttons/asset-manager/delete-files-button"
import { MultiFileSelectButton } from "@/features/dashboard/components/buttons/asset-manager/multi-file-select-button"
import { SelectAllFilesButton } from "@/features/dashboard/components/buttons/asset-manager/select-all-files-button"
import { UnSelectFilesButton } from "@/features/dashboard/components/buttons/asset-manager/unselect-files-button"
import { FileCategoryFilter } from "@/features/dashboard/components/filters/asset-manager/file-category"
import { FileSortFilter } from "@/features/dashboard/components/filters/asset-manager/file-sort"
import { SelectedAssetIds } from "@/features/dashboard/components/pages/asset-manager/selected-asset-ids"
import { useFilterState } from "@/features/dashboard/hooks/asset-manager/use-filter-state"
import type { PickerMode } from "@/features/dashboard/types"

interface AssetFiltersProps {
  className?: string
  pickerMode?: PickerMode
}

export function AssetFilters({ className, pickerMode = "none" }: AssetFiltersProps) {
  const { data, isFetching, isFilterDisabled, isActionDisabled } = useFilterState()

  return (
    <div className={cn("mt-8 flex flex-wrap items-center gap-4", className)}>
      <FileCategoryFilter isDisabled={isFilterDisabled} />
      <FileSortFilter isDisabled={isFilterDisabled} />
      <MultiFileSelectButton pickerMode={pickerMode} isDisabled={isFilterDisabled} />
      <SelectedAssetIds pickerMode={pickerMode} />
      <DeleteFilesButton isActionDisabled={isActionDisabled} />
      <UnSelectFilesButton pickerMode={pickerMode} isActionDisabled={isActionDisabled} />
      {data ? (
        <SelectAllFilesButton data={data} pickerMode={pickerMode} isFetching={isFetching} />
      ) : null}
    </div>
  )
}
