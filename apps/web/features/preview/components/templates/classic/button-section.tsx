import { Button } from "@app/ui/components/button"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

interface ButtonSectionProps {
  title: string
  description: string
  buttonText: string
}

export const ButtonSection = ({ title, description, buttonText }: ButtonSectionProps) => {
  return (
    <SectionRoot className="space-y-6 p-8 pt-7">
      <SectionHeader>
        <SectionTitle>{title}</SectionTitle>
        <SectionDescription>{description}</SectionDescription>
      </SectionHeader>

      <Button size="lg" className="w-full">
        {buttonText}
      </Button>
    </SectionRoot>
  )
}
