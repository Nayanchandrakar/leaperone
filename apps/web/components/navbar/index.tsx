import { getSession } from "@/actions/global/get-session"
import { Logo } from "@/components/navbar/logo"
import { MainNav } from "@/components/navbar/main-nav"

export const Navbar = async () => {
  const session = await getSession()
  return (
    <header className="bg-primary h-14 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Logo />
        <MainNav session={session} />
      </div>
    </header>
  )
}
