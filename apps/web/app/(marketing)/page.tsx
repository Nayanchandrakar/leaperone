import { Fragment } from "react"
import { BusinessEditorLayout } from "@/features/bussiness/components/layouts/home/bussiness-editor-layout"
import { HeroSection } from "@/features/bussiness/components/pages/home/hero-section"

export default function HomePage() {
  return (
    <Fragment>
      <HeroSection />
      <BusinessEditorLayout />
    </Fragment>
  )
}
