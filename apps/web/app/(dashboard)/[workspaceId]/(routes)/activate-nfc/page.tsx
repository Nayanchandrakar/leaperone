"use client"

import { DashboardContainer } from "@/features/dashboard/components/ui/dashboard-container"
import {
  DashboardDescription,
  DashboardTitle,
} from "@/features/dashboard/components/ui/dashboard-heading"

export default function ActivateNfcPage() {
  return (
    <DashboardContainer className="items-center">
      <DashboardTitle>To Activate your new NFC item:</DashboardTitle>
      <DashboardDescription className="max-w-60 text-center">
        Place it at the back of your phone and tap it once
      </DashboardDescription>
    </DashboardContainer>
  )
}
