import type { Testimonial } from "@app/types"
import { Avatar, AvatarImage } from "@app/ui/components/avatar"
import { useMemo } from "react"
import { Member, MemberDescription, MemberName } from "@/features/preview/components/ui/member"
import { SectionRoot } from "@/features/preview/components/ui/section"

type TestimonialCardProps = {
  testimonial: Testimonial
  background: boolean
}

export const TestimonialCard = ({ testimonial, background }: TestimonialCardProps) => {
  const { name, designation, profile, testimonialText } = testimonial

  const profileImage = useMemo(
    () => (profile?.enabled && profile?.imageSrc ? profile.imageSrc : null),
    [profile?.enabled, profile?.imageSrc],
  )

  const designationContent = useMemo(
    () => (designation?.enabled && designation?.text ? designation.text : null),
    [designation?.enabled, designation?.text],
  )

  return (
    <SectionRoot background={background} className="py-6 px-8 space-y-4">
      <Member>
        {profileImage && (
          <Avatar className="size-12">
            <AvatarImage alt="testimonial-profile" src={profileImage} />
          </Avatar>
        )}
        <div className="space-y-0.5 break-all">
          {name && <MemberName>{name}</MemberName>}
          {designationContent && <MemberDescription>{designationContent}</MemberDescription>}
        </div>
      </Member>
      {testimonialText && <MemberDescription>{testimonialText}</MemberDescription>}
    </SectionRoot>
  )
}
