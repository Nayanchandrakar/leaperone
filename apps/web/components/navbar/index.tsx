import { getSession } from "@/actions/utils"
import { Logo } from "@/components/navbar/logo"
import { MainNav } from "@/components/navbar/main-nav"
import { MobileNav } from "@/components/navbar/mobile-nav"

export const Navbar = async () => {
  const session = await getSession()
  return (
    <header className="bg-primary sticky h-14 top-0 z-50">
      <div className="container flex items-center justify-between">
        <Logo />
        <MainNav session={session} />
        <MobileNav />
      </div>
    </header>
  )
}
