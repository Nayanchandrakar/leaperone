import { Fragment } from "react"
import { HeroSection } from "@/features/bussiness/components/pages/home/hero-section"
import { MeshGradient } from "@/features/subscription/components/ui/mesh-gradient"

export default function HomePage() {
  return (
    <Fragment>
      <MeshGradient />
      <HeroSection />
    </Fragment>
  )
}
