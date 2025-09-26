import Link from "next/link"
import { Icons } from "@/components/shared/icons"

export const Logo = () => {
  return (
    <Link href="/">
      <Icons.logo className="size-12" />
      <span className="sr-only">leapercrm</span>
    </Link>
  )
}
