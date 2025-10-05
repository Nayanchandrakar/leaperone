import { getSession } from "@/actions/utils"
import { MobileNav } from "@/components/navbar/mobile-nav"
import { NavActions } from "@/components/navbar/nav-actions"
import { Navigation } from "@/components/navbar/navigation"
import {
  Header,
  HeaderContainer,
  HeaderLogo,
  HeaderNavigation,
} from "@/components/ui/header"

export const Navbar = async () => {
  const session = await getSession()

  return (
    <Header>
      <HeaderContainer>
        <HeaderLogo />
        <MobileNav />
        <HeaderNavigation>
          <Navigation />
          <NavActions session={session} />
        </HeaderNavigation>
      </HeaderContainer>
    </Header>
  )
}
