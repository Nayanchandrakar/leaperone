"use client"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@app/ui/components/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@app/ui/components/sidebar"
import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createRoute, isRouteActive } from "@/features/dashboard/utils"

type DashboardNavProps = {
  data: {
    name: string
    url: string
    icon: LucideIcon
    items?: {
      title: string
      url: string
    }[]
  }[]
  workspaceId: string
}

export function DashboardNav({ data, workspaceId }: DashboardNavProps) {
  const currentPath = usePathname()

  return (
    <SidebarGroup>
      <SidebarMenu>
        {data.map((item) => {
          const href = createRoute(`${workspaceId}/${item.url}`)
          const isActive = isRouteActive({
            currentPath: currentPath,
            targetPath: href,
            depth: 2,
          })

          return (
            <Collapsible key={item.name} asChild defaultOpen={isActive}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={href}>
                    <item.icon />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuAction className="data-[state=open]:rotate-90">
                        <ChevronRight />
                        <span className="sr-only">Toggle</span>
                      </SidebarMenuAction>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <a href={subItem.url}>
                                <span>{subItem.title}</span>
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
