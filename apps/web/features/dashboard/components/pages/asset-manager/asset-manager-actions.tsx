"use client"

import { Button } from "@app/ui/components/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@app/ui/components/select"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useShallow } from "zustand/react/shallow"
import { deleteFiles } from "@/features/dashboard/actions/delete-files"
import {
  SortFilterBar,
  SortFilterBarLabel,
} from "@/features/dashboard/components/ui/sort-filter-bar"
import {
  FILE_CATEGORIES,
  FILE_SORTS,
} from "@/features/dashboard/constants/asset-manager/filter-options"
import { useAssetFilterStore } from "@/features/dashboard/hooks/asset-manager/use-asset-file-store"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import type { FileCategory, SortOptions } from "@/features/dashboard/types"

interface AssetManagerActionProps {
  data: any[]
}

export const AssetManagerActions = ({ data }: AssetManagerActionProps) => {
  const { fileCategory, setFileCategory, setSortOptions, sortOptions } = useAssetFilterStore(
    useShallow((state) => ({
      sortOptions: state.sortOptions,
      fileCategory: state.fileCategory,
      setSortOptions: state.setSortOptions,
      setFileCategory: state.setFileCategory,
    })),
  )

  const {
    selectedAssetIds,
    toggleSelectionMode,
    setSelectedAssetIds,
    isSelectionMode,
    clearSelectedAssetIds,
  } = useAssetStore(
    useShallow((state) => ({
      clearSelectedAssetIds: state.clearSelectedAssetIds,
      isSelectionMode: state.isSelectionMode,
      selectedAssetIds: state.selectedAssetIds,
      toggleSelectionMode: state.toggleSelectionMode,
      setSelectedAssetIds: state.setSelectedAssetIds,
    })),
  )

  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (ids: string[]) => await deleteFiles(ids),
    onSuccess: ({ count }) => {
      queryClient.invalidateQueries({ queryKey: ["files"] })
      clearSelectedAssetIds()
      toast.success(`Succefully deleted ${count} files`)
    },
  })

  return (
    <div className="mt-8 flex items-center gap-4">
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

      <SortFilterBar>
        <SortFilterBarLabel>Sort by:</SortFilterBarLabel>
        <Select
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

      {!isSelectionMode && (
        <Button variant="gray-outline" onClick={() => toggleSelectionMode(true)}>
          Select Multiple Files
        </Button>
      )}

      {selectedAssetIds?.length > 0 && (
        <span className="font-normal text-base text-primary">
          {selectedAssetIds?.length} selected
        </span>
      )}

      {selectedAssetIds?.length > 0 && (
        <Button
          variant="destructive"
          className="min-w-32"
          onClick={() => mutateAsync(selectedAssetIds)}
          disabled={isPending}
        >
          Delete
        </Button>
      )}

      {selectedAssetIds?.length > 0 && (
        <Button variant="gray-outline" onClick={() => clearSelectedAssetIds()}>
          Unselect
        </Button>
      )}

      {isSelectionMode && selectedAssetIds?.length < data?.length && (
        <Button variant="gray-outline" onClick={() => setSelectedAssetIds(data.map((f) => f?.id))}>
          Select All
        </Button>
      )}
    </div>
  )
}
