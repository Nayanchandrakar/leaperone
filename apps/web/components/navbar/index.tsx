import { Logo } from "@/components/navbar/logo"
import { Navigation } from "@/components/navbar/navigation"
import { Container } from "@/components/shared/container"

export const Navbar = () => {
  return (
    <header className="bg-primary border-b sticky top-0 h-16">
      <Container className=" flex items-center justify-between">
        <Logo />
        <Navigation />
      </Container>
    </header>
  )
}
