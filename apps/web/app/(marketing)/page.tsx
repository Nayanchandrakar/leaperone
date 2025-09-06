import { Fragment } from "react"
import { getSession } from "@/features/auth/actions/get-session"
import { HeroSection } from "@/features/bussiness/components/pages/home/hero-section"
import { MeshGradient } from "@/features/subscription/components/ui/mesh-gradient"

export default async function HomePage() {
  const session = await getSession()
  console.log(session)
  return (
    <Fragment>
      <MeshGradient />
      <HeroSection />
    </Fragment>
  )
}
