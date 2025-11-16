import { Fragment } from "react"
import { BussinessCardSection } from "@/features/bussiness/components/pages/home/bussiness-card-section"
import { HeroSection } from "@/features/bussiness/components/pages/home/hero-section"

export default function HomePage() {
  return (
    <Fragment>
      <HeroSection />
      <BussinessCardSection />
    </Fragment>
  )
}
