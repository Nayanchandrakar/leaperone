"use client"

import { Plus } from "lucide-react"
import {
  DashboardStats,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"
import {
  PromptAction,
  PromptMessage,
} from "@/features/dashboard/components/ui/feature-action-prompt"

export const DashboardBussinessCard = () => {
  return (
    <DashboardStats>
      <DashboardStatsTitle>My Bussiness card</DashboardStatsTitle>
      <PromptMessage>
        No digital business card created yet. Start your smart networking journey by creating one
        now!
      </PromptMessage>
      <PromptAction>
        <Plus className="size-4" />
        Create Digital Business Card
      </PromptAction>
    </DashboardStats>
  )
}
