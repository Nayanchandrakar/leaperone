import { faker } from "@faker-js/faker"
import { TeamMember } from "./team-member"

interface TeamSectionProps {
  title: string
  description: string
}

export const TeamSection = ({ title, description }: TeamSectionProps) => {
  return (
    <article className="space-y-2">
      <header className="space-y-3 bg-white py-7 px-8 rounded-3xl text-center">
        <h2 className="text-[28px] font-semibold text-primary">{title}</h2>
        <p className="text-base font-normal text-muted-foreground">{description}</p>
      </header>

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
