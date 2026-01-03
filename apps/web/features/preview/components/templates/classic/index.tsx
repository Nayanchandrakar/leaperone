import { BrandingButton } from "@/features/preview/components/buttons/classic/branding-button"
import { FloatingActions } from "@/features/preview/components/buttons/classic/floating-actions"
import { ClassicSectionRenderer } from "@/features/preview/components/templates/classic/section-renderer"
import { ThemeContainer } from "@/features/preview/components/ui/theme-container"
import type { TemplateProps } from "@/features/preview/types"

export default function ClassicTemplate({ design, mode, contents, floating }: TemplateProps) {
  return (
    <ThemeContainer design={design} data-mode={mode}>
      <section className="max-w-107.5 mx-auto mb-16 overflow-hidden bg-template-background space-y-5 sm:my-12 md:my-20 sm:rounded-3xl p-2 xs:p-4 rounded-b-[calc(8px+var(--card-radius))] xs:rounded-b-[calc(16px+var(--card-radius))]">
        {contents.map((content) => (
          <ClassicSectionRenderer key={content?.id} content={content} />
        ))}
        <BrandingButton settings={design?.settings} />
      </section>
      {floating && <FloatingActions content={floating} />}
    </ThemeContainer>
  )
}
