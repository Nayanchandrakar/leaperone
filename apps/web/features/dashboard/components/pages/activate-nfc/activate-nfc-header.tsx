import {
  DashboardDescription,
  DashboardTitle,
} from "@/features/dashboard/components/ui/dashboard-heading"

export const ActivateNfcHeader = () => {
  return (
    <div className="max-w-md mx-auto space-y-2 text-center">
      <DashboardTitle>To Activate your new NFC item:</DashboardTitle>
      <DashboardDescription className="text-center">
        Place it at the back of your phone <br /> and tap it once
      </DashboardDescription>
    </div>
  )
}
