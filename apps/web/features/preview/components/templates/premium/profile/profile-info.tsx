import type { ProfileCardSection } from "@app/types"
import { cn } from "@app/ui/lib/utils"
import { useMemo } from "react"
import { SectionHeader, SectionTitle } from "@/features/preview/components/ui/section"

interface ProfileInfoProps {
  name: ProfileCardSection["name"]
  info: ProfileCardSection["info"]
}

export function ProfileInfo({ name, info }: ProfileInfoProps) {
  const { primary, secondary } = info

  const nameContent = useMemo(
    () => (name.enabled && name?.name ? name.name : null),
    [name.enabled, name.name],
  )

  const primaryContent = useMemo(
    () => (primary.enabled && primary?.text ? primary.text : null),
    [primary.enabled, primary.text],
  )

  const secondaryContent = useMemo(
    () => (secondary.enabled && secondary?.text ? secondary.text : null),
    [secondary.enabled, secondary.text],
  )

  const infoContents = [primaryContent, secondaryContent].filter(Boolean)

  return (
    <article
      className={cn(
        "relative bg-white p-6 rounded-[20px] space-y-4",
        "group-data-[enabled=true]/profile:-mt-32 group-data-[enabled=true]/profile:w-fit group-data-[enabled=true]/profile:max-w-75.5 group-data-[enabled=true]/profile:mx-auto",
      )}
    >
      <SectionHeader className="break-all">
        {nameContent && <SectionTitle>{nameContent}</SectionTitle>}
        {infoContents?.length > 0 && (
          <div className="divide-y divide-border">
            {infoContents.map((content, index) => (
              <p
                key={index}
                className="text-sm font-template-body text-template-muted-foreground py-1.5 px-3"
              >
                {content}
              </p>
            ))}
          </div>
        )}
      </SectionHeader>
    </article>
  )
}
