import type { ProfileCardSection } from "@app/types"
import Image from "next/image"

type ProfileImageProps = {
  profile: ProfileCardSection["details"]["profile"]
}

export function ProfileImageWrapper({ profile }: ProfileImageProps) {
  // Early exit
  if (!profile.enabled) return

  return (
    <figure className="relative aspect-square -m-2 xs:-m-4">
      {profile?.imageSrc && <Image fill src={profile.imageSrc} alt="user-profile-image" />}
    </figure>
  )
}
