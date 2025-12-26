import Image from "next/image"
import { Icons } from "@/components/shared/icons"

interface ProfileImageProps {
  imageSrc: string
}

export const ProfileImage = ({ imageSrc }: ProfileImageProps) => {
  return (
    <figure className="relative aspect-square bg-blue-200">
      <Image fill alt="profile-image" src={imageSrc} />
      <Icons.curvedBanner className="w-full h-fit absolute -bottom-1" />
    </figure>
  )
}
