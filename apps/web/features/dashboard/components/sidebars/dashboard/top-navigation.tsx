import { NavSettings } from "@/components/navbar/nav-settings"
import { Navigation } from "@/components/navbar/navigation"
import {
  Header,
  HeaderContainer,
  HeaderNavigation,
} from "@/components/ui/header"
import type { User } from "@/types"

type Props = {
  user: User
}

export const TopNavigation = ({ user }: Props) => {
  return (
    <Header className="static">
      <HeaderContainer>
        <span />
        <HeaderNavigation className="flex gap-x-4">
          <Navigation className="hidden lg:flex" />
          <NavSettings user={user} />
        </HeaderNavigation>
      </HeaderContainer>
    </Header>
  )
}
