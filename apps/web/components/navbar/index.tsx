import { Logo } from "@/components/navbar/logo"
import { MainNav } from "@/components/navbar/main-nav"
import { MobileNav } from "@/components/navbar/mobile-nav"
import { Container } from "@/components/shared/container"

export const Navbar = () => {
  return (
    <header className="bg-primary sticky top-0 z-50 h-16">
      <Container className=" flex items-center justify-between">
        <Logo />
        <MainNav />
        <MobileNav />
      </Container>
    </header>
  )
}
