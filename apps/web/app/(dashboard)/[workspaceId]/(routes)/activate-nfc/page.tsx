import { Separator } from "@app/ui/components/separator"
import { ActivateNfcCardImage } from "@/features/dashboard/components/pages/activate-nfc/activate-nfc-card-image"
import { ActivateNfcHeader } from "@/features/dashboard/components/pages/activate-nfc/activate-nfc-header"
import { ActivateNfcInstructions } from "@/features/dashboard/components/pages/activate-nfc/activate-nfc-instructions"
import { ActivateNfcShopSection } from "@/features/dashboard/components/pages/activate-nfc/activate-nfc-shop-section"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"

export default function ActivateNfcPage() {
  return (
    <DashboardContainer className="relative before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(188,255,163,0.56)_0%,transparent_70%)] before:-z-1 z-10 before:blur-xl">
      <ActivateNfcHeader />
      <ActivateNfcCardImage />

      <section className="mt-20 max-w-xl mx-auto">
        <ActivateNfcInstructions />
        <Separator className="mt-8" />
        <ActivateNfcShopSection />
      </section>
    </DashboardContainer>
  )
}
