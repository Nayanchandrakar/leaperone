import { create } from "zustand"
import {
  FILE_SORTING_OPTIONS,
  FILE_TYPE_OPTIONS,
} from "@/features/dashboard/constants/asset-manager/filter-options"
import type { FileType, SortBy } from "@/features/dashboard/types"

type StoreProps = {
  sortBy: SortBy
  fileType: FileType
  searchQuery: string
  setSortBy: (sort: SortBy) => void
  setFileType: (type: FileType) => void
  setSearchQuery: (query: string) => void
}

export const useFileStorage = create<StoreProps>()((set) => ({
  searchQuery: "",
  fileType: FILE_TYPE_OPTIONS[0]!.value,
  sortBy: FILE_SORTING_OPTIONS[2]!.value,

  setSortBy: (sort: SortBy) => set({ sortBy: sort }),
  setFileType: (type: FileType) => set({ fileType: type }),
  setSearchQuery: (query: string) => set({ searchQuery: query }),
}))
