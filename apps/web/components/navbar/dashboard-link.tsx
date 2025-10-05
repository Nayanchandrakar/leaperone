import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"

type Props = {
  workspaceId: string
}

export const DashboardLinkButton = ({ workspaceId }: Props) => {
  if (!workspaceId) return

  return (
    <Link
      prefetch
      className={buttonVariants({
        size: "sm",
        variant: "white-outline",
        className: "font-semibold",
      })}
      href={`/${workspaceId}/dashboard`}
    >
      Dashboard
    </Link>
  )
}
