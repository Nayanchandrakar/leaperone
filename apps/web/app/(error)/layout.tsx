import { Navbar } from "@/components/navbar"
import { LegalFooter } from "@/components/shared/legal-footer"

interface SubscriptionLayoutProps {
  children: React.ReactNode
}

export default function SubscriptionLayout({ children }: Readonly<SubscriptionLayoutProps>) {
  return (
    <>
      <Navbar />
      {children}
      <LegalFooter />
    </>
  )
}
