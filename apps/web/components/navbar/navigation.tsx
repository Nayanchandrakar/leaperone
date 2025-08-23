import Link from "next/link"
import { ListComponent } from "@/components/shared/list-component"
import { NAV_LINKS } from "@/constants/nav-links"
import { ActionButtons } from "./action-buttons"

export const Navigation = () => {
  return (
    <nav className="flex items-center gap-x-6">
      <ListComponent
        className="flex items-center justify-center gap-5"
        data={NAV_LINKS}
        renderItem={({ name, href }) => (
          <Link
            key={name}
            href={href}
            className="text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            {name}
          </Link>
        )}
      />
      <ActionButtons />
    </nav>
  )
}
