import type { TeamSection } from "@app/core/types"
import { useMemo } from "react"
import { TeamMemberCard } from "@/features/preview/components/cards/classic/team-member-card"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

type TeamsSectionProps = {
  content: TeamSection
}

export const TeamsSection = ({ content }: TeamsSectionProps) => {
  const { heading, description, members } = content

  const headingContent = useMemo(
    () => (heading.enabled && heading?.text ? heading.text : null),
    [heading],
  )

  const descriptionContent = useMemo(
    () => (description.enabled && description?.text ? description.text : null),
    [description],
  )

  return (
    <article className="space-y-2">
      {(headingContent || descriptionContent) && (
        <SectionRoot className="py-7 px-8">
          <SectionHeader>
            {headingContent && <SectionTitle>{headingContent}</SectionTitle>}
            {descriptionContent && <SectionDescription>{descriptionContent}</SectionDescription>}
          </SectionHeader>
        </SectionRoot>
      )}
      {Array.isArray(members) &&
        members.map((member) => <TeamMemberCard key={member?.id} {...member} />)}
    </article>
  )
}
