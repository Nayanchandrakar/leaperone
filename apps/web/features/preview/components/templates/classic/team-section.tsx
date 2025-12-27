"use client"

import { faker } from "@faker-js/faker"
import { useMemo } from "react"
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
  // Generate team members data once to avoid hydration mismatch
  const teamMembers = useMemo(() => {
    // Seed faker for consistent results
    faker.seed(12345)

    return Array.from({ length: 5 }).map((_, index) => ({
      id: index,
      avatarUrl: faker.image.avatar(),
      name: faker.person.firstName(),
      jobTitle: faker.person.jobTitle(),
    }))
  }, [])

  return (
    <article className="space-y-2">
      <SectionRoot className="py-7 px-8">
        <SectionHeader>
          <SectionTitle>{title}</SectionTitle>
          <SectionDescription>{description}</SectionDescription>
        </SectionHeader>
      </SectionRoot>

      {teamMembers.map((member) => (
        <TeamMember
          key={member.id}
          avatarUrl={member.avatarUrl}
          name={member.name}
          jobTitle={member.jobTitle}
        />
      ))}
    </article>
  )
}
