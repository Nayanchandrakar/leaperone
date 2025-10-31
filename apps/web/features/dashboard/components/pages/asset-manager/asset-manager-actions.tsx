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
  FILE_SORTING_OPTIONS,
  FILE_TYPE_OPTIONS,
} from "@/features/dashboard/constants/asset-manager/filter-options"
import { useAssetStore } from "@/features/dashboard/hooks/asset-manager/use-asset-store"
import { useFileStorage } from "@/features/dashboard/hooks/asset-manager/use-file-store"
import type { FileType, SortBy } from "@/features/dashboard/types"

interface AssetManagerActionProps {
  data: any[]
}

export const AssetManagerActions = ({ data }: AssetManagerActionProps) => {
  const { fileType, setFileType, setSortBy, sortBy } = useFileStorage(
    useShallow((state) => ({
      sortBy: state.sortBy,
      fileType: state.fileType,
      setSortBy: state.setSortBy,
      setFileType: state.setFileType,
    })),
  )

  const {
    setShowCheckboxes,
    selectedCards,
    setSelectedCards,
    showCheckboxes,
    removeAllSelectedCards,
  } = useAssetStore(
    useShallow((state) => ({
      removeAllSelectedCards: state.removeAllSelectedCards,
      showCheckboxes: state.showCheckboxes,
      selectedCards: state.selectedCards,
      setSelectedCards: state.setSelectedCards,
      setShowCheckboxes: state.setShowCheckboxes,
    })),
  )

  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (ids: string[]) => await deleteFiles(ids),
    onSuccess: ({ count }) => {
      queryClient.invalidateQueries({ queryKey: ["files"] })
      removeAllSelectedCards()
      toast.success(`Succefully deleted ${count} files`)
    },
  })

  return (
    <div className="mt-8 flex items-center gap-4">
      <SortFilterBar>
        <SortFilterBarLabel>Type:</SortFilterBarLabel>
        <Select defaultValue={fileType} onValueChange={(type: FileType) => setFileType(type)}>
          <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {FILE_TYPE_OPTIONS.map(({ title, value }) => (
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
        <Select defaultValue={sortBy} onValueChange={(type: SortBy) => setSortBy(type)}>
          <SelectTrigger className="w-40 rounded-full bg-muted border-zinc-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {FILE_SORTING_OPTIONS.map(({ title, value }) => (
                <SelectItem key={value} value={value}>
                  {title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </SortFilterBar>

      {!showCheckboxes && (
        <Button variant="gray-outline" onClick={() => setShowCheckboxes(true)}>
          Select Multiple Files
        </Button>
      )}

      {selectedCards?.length > 0 && (
        <span className="font-normal text-base text-primary">{selectedCards?.length} selected</span>
      )}

      {selectedCards?.length > 0 && (
        <Button
          variant="destructive"
          className="min-w-32"
          onClick={() => mutateAsync(selectedCards)}
          disabled={isPending}
        >
          Delete
        </Button>
      )}

      {selectedCards?.length > 0 && (
        <Button variant="gray-outline" onClick={() => removeAllSelectedCards()}>
          Unselect
        </Button>
      )}

      {showCheckboxes && selectedCards?.length < data?.length && (
        <Button variant="gray-outline" onClick={() => setSelectedCards(data.map((f) => f?.id))}>
          Select All
        </Button>
      )}
    </div>
  )
}
