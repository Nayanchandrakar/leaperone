import type { ProfileCardSection } from "@app/core/types"
import { memo } from "react"

type ProfileSection = {
  content: ProfileCardSection
}

export const ProfileSection = memo(({ content }: ProfileSection) => {
  if (!content?.enabled) return

  return <div>Classic Card Profile Section</div>
})
