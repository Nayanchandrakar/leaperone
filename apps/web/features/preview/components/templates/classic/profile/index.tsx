import type { ProfileCardSection } from "@app/core/types"
import { MapPin } from "lucide-react"
import Image from "next/image"
import { Icons } from "@/components/shared/icons"
import { IconBadge } from "../../../ui/icon-badge"
import { SectionHeader, SectionTitle } from "../../../ui/section"

type ProfileSectionProps = {
  content: ProfileCardSection
}

export const ProfileSection = ({ content }: ProfileSectionProps) => {
  const { details, info, name } = content
  return (
    <>
      <figure className="relative aspect-square">
        <Image fill alt="profile-image" src={details.profile.imageSrc} />
        <Icons.curvedBanner className="w-full h-fit absolute -bottom-1" />
      </figure>
      <article className="-mt-32 relative bg-white p-6 rounded-2xl space-y-4 w-fit max-w-75.5 mx-auto">
        <SectionHeader>
          <SectionTitle>{name.name}</SectionTitle>
          <div className="divide-y divide-border text-sm font-(--font-body-weight) text-(--supporting-text-color) [&_p]:p-1.5 px-3">
            <p>{info.primary.text}</p>
            <p>{info.secondary.text}</p>
          </div>
        </SectionHeader>
      </article>

      <nav className="flex-center gap-4 xs:gap-6 mt-7 bg-amber-50">
        {Array.from({ length: 4 }).map((_, index) => (
          <IconBadge
            key={index}
            Icon={MapPin}
            className="size-12 xs:size-15"
            iconClassName="size-4 xs:size-6"
          />
        ))}
      </nav>
    </>
  )
}
