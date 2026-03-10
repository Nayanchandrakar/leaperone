import { dbHttp } from "@app/database/adapters/http"
import { businessCard, subscription } from "@app/database/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TemplateRenderer } from "@/features/preview/components/ui/template-renderer"
import { getGoogleFontsUrl } from "@/features/preview/utils/font-utils"
import { separateSections } from "@/features/preview/utils/seperate-sections"

interface CardPageProps {
  params: Promise<{ id: string }>
}

export default async function CardPage({ params }: CardPageProps) {
  const { id } = await params

  const [data] = await dbHttp
    .select({
      businessCard: businessCard,
      subscription,
    })
    .from(businessCard)
    .where(eq(businessCard.id, id))
    .innerJoin(subscription, eq(businessCard.workspaceId, subscription.workspaceId))
    .limit(1)
    .$withCache()

  if (!data) {
    return notFound()
  }

  const {
    businessCard: { design, template, status, content },
  } = data

  if (status !== "active") {
    return <p className="text-center text-sm text-muted-foreground">This card is not active</p>
  }

  const { mainSections, floatingButton } = separateSections(content)

  return (
    <>
      {/* Only add DNS-prefetch and preconnect hints if we are fetching fonts from Google Fonts. */}
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* 
        The `precedence` prop activates <head> hoisting for stylesheets in React 19+.
        Without precedence, the <link> stays in <body> and browser font requests may not fire.
      */}
      <link rel="stylesheet" href={getGoogleFontsUrl(design?.font)!} precedence="default" />

      <TemplateRenderer
        design={design}
        template={template}
        contents={mainSections}
        floating={floatingButton}
      />
    </>
  )
}
