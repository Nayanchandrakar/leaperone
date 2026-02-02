import { Navbar } from "@/components/navbar"
import { LegalFooter } from "@/components/shared/legal-footer"

export default function SubscriptionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <LegalFooter />
    </>
  )
}
