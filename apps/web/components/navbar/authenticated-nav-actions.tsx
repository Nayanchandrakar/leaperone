import { getWorkspaceIdByOwnerId } from "@app/database/repository/workspace"
import { buttonVariants } from "@app/ui/components/button"
import Link from "next/link"
import type { FullSession } from "@/types"

type AuthenticatedNavActionProps = {
  session: FullSession
}

export const AuthenticatedNavActions = async ({
  session,
}: AuthenticatedNavActionProps) => {
  const workspace = await getWorkspaceIdByOwnerId(session.user.id)

  return (
    workspace && (
      <Link
        prefetch
        className={buttonVariants({
          size: "sm",
          variant: "outline",
          className: "font-semibold",
        })}
        href={`/${workspace.id}/dashboard`}
      >
        Dashboard
      </Link>
    )
  )
}
