import { create } from "zustand"
import { FAQ_SUPPORT_MODES } from "@/features/marketing/constants/faq-support/faq-support-modes"

type FaqStore = {
  mode: string
  setMode: (newMode: string) => void
}

export const useFaqStore = create<FaqStore>()((set) => ({
  mode: FAQ_SUPPORT_MODES[0]!.id,
  setMode: (newMode) => set({ mode: newMode }),
}))
