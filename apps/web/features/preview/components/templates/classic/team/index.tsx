import type { TeamSection as Content } from "@app/core/types"
import { useMemo } from "react"
import { TeamMembersList } from "@/features/preview/components/templates/classic/team/team-members-list"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

type TeamSectionProps = {
  content: Content
}

export const TeamSection = ({ content }: TeamSectionProps) => {
  const { heading, description, members, background } = content

  const headingContent = useMemo(
    () => (heading?.enabled && heading?.text ? heading.text : null),
    [heading?.enabled, heading?.text],
  )

  const descriptionContent = useMemo(
    () => (description?.enabled && description?.text ? description.text : null),
    [description?.enabled, description?.text],
  )

  return (
    <article className="space-y-2">
      {(headingContent || descriptionContent) && (
        <SectionRoot background={background} className="py-7 px-8">
          <SectionHeader>
            {headingContent && <SectionTitle>{headingContent}</SectionTitle>}
            {descriptionContent && <SectionDescription>{descriptionContent}</SectionDescription>}
          </SectionHeader>
        </SectionRoot>
      )}
      <TeamMembersList members={members} background={background} />
    </article>
  )
}
