import { SectionDescription, SectionHeader, SectionRoot, SectionTitle } from "../../ui/section"

interface AboutSectionProps {
  content: string
}

export const AboutSection = ({ content }: AboutSectionProps) => {
  return (
    <SectionRoot className="space-y-3 p-8 pt-7 text-center">
      <SectionHeader>
        <SectionTitle>About Me</SectionTitle>
        <SectionDescription>{content}</SectionDescription>
      </SectionHeader>
    </SectionRoot>
  )
}
