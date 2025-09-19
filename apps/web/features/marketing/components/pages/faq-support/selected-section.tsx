"use client"

import { useShallow } from "zustand/react/shallow"
import { FaqSection } from "@/features/marketing/components/pages/faq-support/faq-section"
import { SupportSection } from "@/features/marketing/components/pages/faq-support/support-section"
import { useFaqStore } from "@/features/marketing/hooks/faq-support/use-faq-store"

export const SelectedSection = () => {
  const { mode } = useFaqStore(
    useShallow((state) => ({
      mode: state.mode,
    })),
  )

  switch (mode) {
    case "faq":
      return <FaqSection />

    case "support":
      return <SupportSection />

    default:
      return <FaqSection />
  }
}
