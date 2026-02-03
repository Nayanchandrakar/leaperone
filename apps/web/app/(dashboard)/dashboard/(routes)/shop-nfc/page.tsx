import { ShopNfcHeader } from "@/features/dashboard/components/pages/shop-nfc/shop-nfc-header"
import { ShopNfcProductsSection } from "@/features/dashboard/components/pages/shop-nfc/shop-nfc-products-section"
import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"

export default function ShopNfcPage() {
  return (
    <DashboardContainer className="relative before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_50%_50%,rgba(188,255,163,0.56)_0%,transparent_80%)] before:-z-1 z-10 before:blur-xl my-16">
      <ShopNfcHeader />
      <ShopNfcProductsSection />
    </DashboardContainer>
  )
}
