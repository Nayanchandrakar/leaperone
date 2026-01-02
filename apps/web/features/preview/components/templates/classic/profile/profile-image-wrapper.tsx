import type { ProfileCardSection } from "@app/core/types"
import Image from "next/image"
import { Icons } from "@/components/shared/icons"

type ProfileImageProps = {
  profile: ProfileCardSection["details"]["profile"]
}

export function ProfileImageWrapper({ profile }: ProfileImageProps) {
  // Early exit
  if (!profile.enabled) return

  return (
    <figure className="relative aspect-square -m-2 xs:-m-4">
      {profile?.imageSrc && <Image fill src={profile.imageSrc} alt="user-profile-image" />}
      <Icons.curvedBanner className="w-full h-fit absolute -bottom-1" />
    </figure>
  )
}
