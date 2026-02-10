"use client"

import { BusinessCardItem } from "@/features/dashboard/components/cards/dashboard/business-card-item"
import { CreateBusinessCard } from "@/features/dashboard/components/cards/dashboard/create-business-card"
import { BusinessCardSkeleton } from "@/features/dashboard/components/skeletons/dashboard"
import {
  DashboardStats,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"
import { useBusinessCards } from "@/features/dashboard/hooks/dashboard/use-business-cards"

// Main component
export const BusinessCardSection = () => {
  return (
    <DashboardStats>
      <DashboardStatsTitle>My Business Card</DashboardStatsTitle>
      <BusinessCardList />
    </DashboardStats>
  )
}

const BusinessCardList = () => {
  const { data, isPending, isError } = useBusinessCards()

  // If there is an error or pending state, show the skeleton
  if (isPending || isError) return <BusinessCardSkeleton />

  // If no business cards are found, show the empty state
  if (!data?.card) return <CreateBusinessCard />

  // If there are business cards, show them
  return <BusinessCardItem key={data.card.id} item={data.card} />
}
