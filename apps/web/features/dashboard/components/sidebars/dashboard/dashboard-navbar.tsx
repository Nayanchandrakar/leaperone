import { NavSettings } from "@/components/navbar/nav-settings"
import { Navigation } from "@/components/navbar/navigation"
import {
  Header,
  HeaderContainer,
  HeaderNavigation,
} from "@/components/ui/header"
import { DashboardSidebarToogle } from "@/features/dashboard/components/buttons/dashboard/dashboard-sidebar-toogle"
import type { User } from "@/types"

type Props = {
  user: User
}

export const DashboardNavbar = ({ user }: Props) => {
  return (
    <Header className="static">
      <HeaderContainer className="md:justify-end">
        <DashboardSidebarToogle />
        <HeaderNavigation className="flex gap-x-4">
          <Navigation className="hidden lg:flex" />
          <NavSettings user={user} />
        </HeaderNavigation>
      </HeaderContainer>
    </Header>
  )
}
