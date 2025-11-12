import {
  DashboardDescription,
  DashboardTitle,
} from "@/features/dashboard/components/ui/dashboard-heading"

export const ShopNfcHeader = () => {
  return (
    <section className="max-w-lg mx-auto space-y-2 text-center">
      <DashboardTitle>Shop The NFC Smart Bundle</DashboardTitle>
      <DashboardDescription className="text-center">
        Get our smart NFC Smart Kit, a bundle that comes with sleek business card, stylish
        wristband, and handy phone tag and share your digital business card in just a tap and leave
        a lasting impression.
      </DashboardDescription>
    </section>
  )
}
