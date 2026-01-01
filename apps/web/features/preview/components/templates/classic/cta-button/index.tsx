import type { CtaButtonSection as Content } from "@app/core/types"
import { memo, useMemo } from "react"
import { CtaButton } from "@/features/preview/components/buttons/classic/cta-button"
import {
  SectionDescription,
  SectionHeader,
  SectionRoot,
  SectionTitle,
} from "@/features/preview/components/ui/section"

type CtaButtonSectionProps = {
  content: Content
}

export const CtaButtonSection = memo(({ content }: CtaButtonSectionProps) => {
  const { heading, description, label, link } = content

  const headingContent = useMemo(
    () => (heading.enabled && heading?.text ? heading.text : null),
    [heading],
  )
  const descriptionContent = useMemo(
    () => (description.enabled && description?.text ? description.text : null),
    [description],
  )

  return (
    <SectionRoot className="space-y-6 p-8 pt-7">
      {(headingContent || descriptionContent) && (
        <SectionHeader>
          {headingContent && <SectionTitle>{headingContent}</SectionTitle>}
          {descriptionContent && <SectionDescription>{descriptionContent}</SectionDescription>}
        </SectionHeader>
      )}
      <CtaButton href={link} label={label} />
    </SectionRoot>
  )
})
