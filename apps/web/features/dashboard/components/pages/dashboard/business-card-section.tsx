"use client"

import { useQuery } from "@tanstack/react-query"
import { getBusinessCardQueryOptions } from "@/features/bussiness/utils"
import { BusinessCardItem } from "@/features/dashboard/components/cards/dashboard/business-card-item"
import { CreateBusinessCard } from "@/features/dashboard/components/cards/dashboard/create-business-card"
import { BusinessCardSkeleton } from "@/features/dashboard/components/skeletons/dashboard"
import {
  DashboardStats,
  DashboardStatsTitle,
} from "@/features/dashboard/components/ui/dashboard-stats"

// Main component
export function BusinessCardSection() {
  return (
    <DashboardStats>
      <DashboardStatsTitle>My Business Card</DashboardStatsTitle>
      <BusinessCardList />
    </DashboardStats>
  )
}

function BusinessCardList() {
  const { data, isPending, isError } = useQuery(getBusinessCardQueryOptions())

  // If there is an error or pending state, show the skeleton
  if (isPending || isError) return <BusinessCardSkeleton />

  // If no business cards are found, show the empty state
  if (!data?.card) return <CreateBusinessCard />

  // If there are business cards, show them
  return <BusinessCardItem key={data.card.id} item={data.card} />
}
