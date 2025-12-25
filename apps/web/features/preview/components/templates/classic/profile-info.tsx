import { SectionHeader, SectionTitle } from "@/features/preview/components/ui/section"

interface ProfileInfoProps {
  name: string
  company: string
  jobTitle: string
}

export const ProfileInfo = ({ name, jobTitle, company }: ProfileInfoProps) => {
  return (
    <article className="-mt-32 relative bg-white p-6 rounded-2xl space-y-4 w-fit max-w-75.5 mx-auto">
      <SectionHeader>
        <SectionTitle>{name}</SectionTitle>
        <div className="divide-y divide-border text-sm font-normal text-muted-foreground [&_p]:p-1.5 px-3">
          <p>{jobTitle}</p>
          <p>{company}</p>
        </div>
      </SectionHeader>
    </article>
  )
}
