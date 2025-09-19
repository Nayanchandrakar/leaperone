"use client"

import { useShallow } from "zustand/react/shallow"
import { FAQ_SUPPORT_MODES } from "@/features/marketing/constants/faq-support/faq-support-modes"
import { useFaqStore } from "@/features/marketing/hooks/faq-support/use-faq-store"
import type { SupportMode } from "@/features/marketing/types"
import { SmoothTab } from "@/features/subscription/components/ui/smooth-tab"

export const FaqSupportButton = () => {
  const { mode, setMode } = useFaqStore(
    useShallow((state) => ({
      mode: state.mode,
      setMode: state.setMode,
    })),
  )

  return (
    <SmoothTab
      defaultTabId={mode}
      items={FAQ_SUPPORT_MODES}
      onChange={(newMode) => setMode(newMode as SupportMode)}
    />
  )
}
