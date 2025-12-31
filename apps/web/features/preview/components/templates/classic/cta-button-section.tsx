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

  const showHeading = useMemo(() => Boolean(heading?.enabled && heading?.text), [heading])
  const showDescription = useMemo(
    () => Boolean(description?.enabled && description?.text),
    [description],
  )

  return (
    <SectionRoot className="space-y-6 p-8 pt-7">
      <SectionHeader>
        {showHeading && <SectionTitle>{heading?.text}</SectionTitle>}
        {showDescription && <SectionDescription>{description?.text}</SectionDescription>}
      </SectionHeader>
      <CtaButton href={link} label={label} />
    </SectionRoot>
  )
})
