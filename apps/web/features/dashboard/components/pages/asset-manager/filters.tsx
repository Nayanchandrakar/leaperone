"use client"

import { DeleteFilesButton } from "@/features/dashboard/components/buttons/asset-manager/delete-files-button"
import { MultiFileSelectButton } from "@/features/dashboard/components/buttons/asset-manager/multi-file-select-button"
import { SelectAllFilesButton } from "@/features/dashboard/components/buttons/asset-manager/select-all-files-button"
import { UnSelectFilesButton } from "@/features/dashboard/components/buttons/asset-manager/unselect-files-button"
import { FileCategoryFilter } from "@/features/dashboard/components/filters/asset-manager/file-category"
import { FileSortFilter } from "@/features/dashboard/components/filters/asset-manager/file-sort"
import { SelectedAssetIds } from "@/features/dashboard/components/pages/asset-manager/selected-asset-ids"
import { useFilterState } from "@/features/dashboard/hooks/asset-manager/use-filter-state"

interface FiltersProps {
  workspaceId: string
}

export const Filters = ({ workspaceId }: FiltersProps) => {
  const { data, isFetching, isFilterDisabled, isActionDisabled } = useFilterState({ workspaceId })

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <FileCategoryFilter isDisabled={isFilterDisabled} />
      <FileSortFilter isDisabled={isFilterDisabled} />
      <MultiFileSelectButton isDisabled={isFilterDisabled} />
      <SelectedAssetIds />
      <DeleteFilesButton isActionDisabled={isActionDisabled} />
      <UnSelectFilesButton isActionDisabled={isActionDisabled} />
      {data && <SelectAllFilesButton data={data} isFetching={isFetching} />}
    </div>
  )
}
