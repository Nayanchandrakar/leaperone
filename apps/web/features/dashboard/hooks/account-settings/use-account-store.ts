import { create } from "zustand"

type AccountStore = {
  currentName: string
  isNameChangeOpen: boolean
  setCurrentName: (name: string) => void
  setIsNameChangeOpen: (isOpen: boolean) => void
}

export const useAccountStore = create<AccountStore>((set) => ({
  currentName: "",
  isNameChangeOpen: false,
  setCurrentName: (name) => set({ currentName: name }),
  setIsNameChangeOpen: (isOpen) => set({ isNameChangeOpen: isOpen }),
}))
