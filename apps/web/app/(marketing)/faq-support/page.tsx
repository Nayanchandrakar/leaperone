import { Fragment } from "react"
import { FaqHeroSection } from "@/features/marketing/components/pages/faq-support/faq-hero-section"
import { RenderSection } from "@/features/marketing/components/pages/faq-support/render-section"

export default function FaqSupportPage() {
  return (
    <Fragment>
      <FaqHeroSection />
      <RenderSection />
    </Fragment>
  )
}
