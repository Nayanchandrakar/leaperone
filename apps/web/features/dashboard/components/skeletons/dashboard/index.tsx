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

export const QuickActionCardSkeleton = () => {
  return Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="border border-zinc-300 rounded-xl px-6 py-7 flex flex-col gap-3 items-center"
    >
      <Skeleton className="size-6" />
      <Skeleton className="w-full h-4" />
    </div>
  ))
}

export const BusinessCardSkeleton = () => {
  return (
    <div className="border rounded-xl divide-y min-[1290px]:divide-x divide-border grid min-[1290px]:grid-cols-[auto_auto]">
      <div className="p-6 space-y-2.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-60" />
          <Skeleton className="size-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-44" />
          <Skeleton className="size-4" />
        </div>
      </div>
      <div className="p-6 flex flex-wrap items-center gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-9 w-32 rounded-full" />
        ))}
      </div>
    </div>
  )
}
