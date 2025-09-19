import { create } from "zustand"
import { FAQ_SUPPORT_MODES } from "@/features/marketing/constants/faq-support/faq-support-modes"
import type { SupportMode } from "@/features/marketing/types"

type FaqStore = {
  mode: SupportMode
  setMode: (newMode: SupportMode) => void
}

export const useFaqStore = create<FaqStore>()((set) => ({
  mode: FAQ_SUPPORT_MODES[0]!.id,
  setMode: (newMode) => set({ mode: newMode }),
}))
