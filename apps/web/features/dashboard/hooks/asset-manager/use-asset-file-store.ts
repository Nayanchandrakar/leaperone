import { create } from "zustand"
import {
  FILE_CATEGORIES,
  FILE_SORTS,
} from "@/features/dashboard/constants/asset-manager/filter-options"
import type { FileCategory, SortOptions } from "@/features/dashboard/types"

type StoreProps = {
  query: string
  sortOptions: SortOptions
  fileCategory: FileCategory
  setQuery: (query: string) => void
  setSortOptions: (sort: SortOptions) => void
  setFileCategory: (type: FileCategory) => void
}

export const useAssetFilterStore = create<StoreProps>()((set) => ({
  query: "",
  sortOptions: FILE_SORTS[2].value,
  fileCategory: FILE_CATEGORIES[0].value,

  setQuery: (query: string) => set({ query: query }),
  setSortOptions: (sort: SortOptions) => set({ sortOptions: sort }),
  setFileCategory: (type: FileCategory) => set({ fileCategory: type }),
}))
