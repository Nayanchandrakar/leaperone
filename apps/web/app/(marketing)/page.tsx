import { BussinessCardSection } from "@/features/bussiness/components/pages/home/bussiness-card-section"
import { HeroSection } from "@/features/bussiness/components/pages/home/hero-section"

export const dynamic = "force-static"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BussinessCardSection />
    </>
  )
}
