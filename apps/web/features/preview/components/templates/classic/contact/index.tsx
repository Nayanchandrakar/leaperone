import type { ContactDetailsSection } from "@app/core/types"
import { memo, useMemo } from "react"
import { LocationButton } from "@/features/preview/components/buttons/classic/location-button"
import { ContactInfoList } from "@/features/preview/components/templates/classic/contact/contact-info-list"
import { SectionRoot, SectionTitle } from "@/features/preview/components/ui/section"

type ContactDetailSectionProps = {
  content: ContactDetailsSection
}

export const ContactDetailSection = memo(({ content }: ContactDetailSectionProps) => {
  const { heading, items } = content
  const showHeading = useMemo(() => heading.enabled && heading?.text, [heading])

  return (
    <SectionRoot className="space-y-4 p-8">
      {showHeading && <SectionTitle className="text-center">{content?.heading?.text}</SectionTitle>}
      <ContactInfoList contacts={items} />
      <LocationButton />
    </SectionRoot>
  )
})
