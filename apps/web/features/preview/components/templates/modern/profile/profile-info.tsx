import type { ProfileCardSection } from "@app/types"
import { cn } from "@app/ui/lib/utils"
import Image from "next/image"
import { useMemo } from "react"
import { SectionHeader, SectionTitle } from "@/features/preview/components/ui/section"

interface ProfileInfoProps {
  name: ProfileCardSection["name"]
  info: ProfileCardSection["info"]
  branding: ProfileCardSection["details"]["branding"]
}

export function ProfileInfo({ name, info, branding }: ProfileInfoProps) {
  const { primary, secondary } = info

  const brandingImageSrc = useMemo(
    () => (branding.enabled && branding?.imageSrc ? branding.imageSrc : null),
    [branding.enabled, branding.imageSrc],
  )

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
      data-branding={!!brandingImageSrc}
      className={cn(
        "relative bg-white rounded-[20px] p-6 space-y-4",
        "group-data-[enabled=true]/profile:-mt-17 group-data-[enabled=true]/profile:w-fit group-data-[enabled=true]/profile:max-w-75.5 group-data-[enabled=true]/profile:mx-auto group-data-[enabled=false]/profile:data-[branding=true]:mt-16",
        "data-[branding=true]:pt-20",
      )}
    >
      {brandingImageSrc && (
        <Image
          unoptimized
          width={136}
          height={136}
          alt="branding-logo"
          src={brandingImageSrc}
          className="absolute left-1/2 -top-16 -translate-x-1/2 rounded-full object-cover size-34"
        />
      )}

      <SectionHeader className="break-all px-4">
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
