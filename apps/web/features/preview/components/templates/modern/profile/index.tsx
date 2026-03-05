import type { ProfileCardSection } from "@app/types"
import { QuickActions } from "@/features/preview/components/templates/classic/profile/quick-actions"
import { ProfileImageWrapper } from "@/features/preview/components/templates/modern/profile/profile-image-wrapper"
import { ProfileInfo } from "@/features/preview/components/templates/modern/profile/profile-info"

type ProfileSectionProps = {
  content: ProfileCardSection
}

export const ProfileSection = ({ content }: ProfileSectionProps) => {
  const { details, info, name, contacts } = content

  return (
    <div data-enabled={details?.profile?.enabled} className="group/profile">
      <ProfileImageWrapper profile={details?.profile} />
      <ProfileInfo branding={details?.branding} name={name} info={info} />
      <QuickActions contacts={contacts} />
    </div>
  )
}
