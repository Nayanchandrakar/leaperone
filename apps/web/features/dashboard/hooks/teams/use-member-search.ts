import { create } from "zustand"

interface MemberSearchState {
  query: string
  setQuery: (value: string) => void
}

export const useMemberSearch = create<MemberSearchState>((set) => ({
  query: "",
  setQuery: (value) => set({ query: value }),
}))
