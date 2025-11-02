"use client"

import { useShallow } from "zustand/react/shallow"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import { useInfiniteFiles } from "@/features/dashboard/hooks/asset-manager/use-infinite-files"
import { DeleteFilesButton } from "../../buttons/asset-manager/delete-files-button"
import { MultiFileSelectButton } from "../../buttons/asset-manager/multi-file-select-button"
import { SelectAllFilesButton } from "../../buttons/asset-manager/select-all-files-button"
import { UnSelectFilesButton } from "../../buttons/asset-manager/unselect-files-button"
import { FileCategoryFilter } from "../../filters/asset-manager/file-category"
import { FileSortFilter } from "../../filters/asset-manager/file-sort"
import { SelectedAssetIds } from "./selected-asset-ids"

type FilterProps = {
  workspaceId: string
}

export const Filters = ({ workspaceId }: FilterProps) => {
  const { fileCategory, sortOptions, query } = useAssetFilterStore(
    useShallow((state) => ({
      query: state.query,
      sortOptions: state.sortOptions,
      fileCategory: state.fileCategory,
    })),
  )

  const { data } = useInfiniteFiles({
    query,
    workspaceId,
    sortOptions,
    fileCategory,
  })

  return (
    <div className="mt-8 flex items-center gap-4">
      <FileCategoryFilter />
      <FileSortFilter />
      <MultiFileSelectButton data={data!} />
      <SelectedAssetIds />
      <DeleteFilesButton />
      <UnSelectFilesButton />
      <SelectAllFilesButton data={data!} />
    </div>
  )
}
