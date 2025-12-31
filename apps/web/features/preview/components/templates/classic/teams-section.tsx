import type { TeamSection } from "@app/core/types"
import { TeamMember } from "@/features/preview/components/cards/classic/team-member"
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
  if (content?.enabled) return

  const showHeading = Boolean(content?.heading?.enabled && content?.heading?.text)
  const showDescription = Boolean(content?.description?.enabled && content?.description?.text)

  return (
    <article className="space-y-2">
      <SectionRoot className="py-7 px-8">
        <SectionHeader>
          {showHeading && <SectionTitle>{content?.heading?.text}</SectionTitle>}
          {showDescription && <SectionDescription>{content?.description?.text}</SectionDescription>}
        </SectionHeader>
      </SectionRoot>

      {Array.isArray(content?.members) &&
        content?.members.map((member) => (
          <TeamMember
            key={member?.id}
            avatarUrl={member?.memberProfile?.imageSrc}
            name={member?.memberName}
            jobTitle={member?.memberDesignation}
          />
        ))}
    </article>
  )
}
