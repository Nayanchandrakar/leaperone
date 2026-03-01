import { dbHttp } from "@app/database/adapters/http"
import { businessCard, subscription } from "@app/database/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import { TemplateRenderer } from "@/features/preview/components/ui/template-renderer"
import type { ContentSections } from "@/features/preview/types"

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function CardPage({ params }: PageProps) {
  const { id } = await params

  // Fetch the business card data by id
  const [data] = await dbHttp
    .select({
      businessCard: businessCard,
      subscription,
    })
    .from(businessCard)
    .where(eq(businessCard.id, id))
    .innerJoin(subscription, eq(businessCard.workspaceId, subscription.workspaceId))
    .limit(1)

  if (!data) {
    return notFound()
  }

  // Expecting data.content to conform to ContentEditor type,
  // which is not the same as the expected array of ContentSections.
  // Here we try to extract relevant fields.

  const {
    businessCard: { design, template, status },
  } = data

  if (status !== "active") {
    return <p className="text-center text-sm text-muted-foreground">This card is not active</p>
  }

  const sections = data.businessCard.content as unknown as ContentSections[]

  return (
    <TemplateRenderer
      design={design}
      contents={sections}
      template={template}
      floating={undefined}
    />
  )
}
