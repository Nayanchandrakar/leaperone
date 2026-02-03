import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@app/ui/components/sidebar"
import { Skeleton } from "@app/ui/components/skeleton"
import { MetricCard } from "@/features/dashboard/components/cards/dashboard/metric-card"

export const OverviewCardSkeleton = () => {
  return Array.from({ length: 4 }).map((_, index) => (
    <MetricCard key={index}>
      <Skeleton className="h-5 w-4/5" />
      <Skeleton className="h-8 max-w-20" />
    </MetricCard>
  ))
}

export const SidebarSkeleton = () => {
  return (
    <SidebarGroup>
      <SidebarMenuSkeleton className="max-w-20" />
      <SidebarGroupContent>
        <SidebarMenu>
          {Array.from({ length: 12 }).map((_, index) => {
            return (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
