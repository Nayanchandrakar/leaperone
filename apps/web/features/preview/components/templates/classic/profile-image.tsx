import Image from "next/image"
import { Icons } from "@/components/shared/icons"

interface ProfileImageProps {
  imageSrc: string
}

export const ProfileImage = ({ imageSrc }: ProfileImageProps) => {
  return (
    <figure className="relative aspect-square">
      <Image fill alt="profile-image" src={imageSrc} />
      <Icons.curvedBanner className="w-full absolute -bottom-2" />
    </figure>
  )
}
