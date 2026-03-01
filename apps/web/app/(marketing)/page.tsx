import { BussinessCardSection } from "@/features/bussiness/components/pages/home/bussiness-card-section"
import { HeroSection } from "@/features/bussiness/components/pages/home/hero-section"

export const dynamic = "force-dynamic"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BussinessCardSection />
    </>
  )
}
