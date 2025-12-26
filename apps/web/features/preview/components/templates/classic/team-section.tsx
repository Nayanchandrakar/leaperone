import { faker } from "@faker-js/faker"
import { TeamMember } from "@/features/preview/components/cards/classic/team-member"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

interface TeamSectionProps {
  title: string
  description: string
}

export const TeamSection = ({ title, description }: TeamSectionProps) => {
  return (
    <article className="space-y-2">
      <SectionRoot className="py-7 px-8">
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </SectionHeader>
      </SectionRoot>

      {Array.from({ length: 5 }).map((_, index) => (
        <TeamMember
          key={index}
          avatarUrl={faker.image.avatar()}
          name={faker.person.firstName()}
          jobTitle={faker.person.jobTitle()}
        />
      ))}
    </article>
  )
}
