import { FloatingActions } from "@/features/preview/components/buttons/classic/floating-actions"
import { ClassicSectionRenderer } from "@/features/preview/components/templates/classic/section-renderer"
import { ThemeContainer } from "@/features/preview/components/ui/theme-container"
import type { TemplateProps } from "@/features/preview/types"

export default function ClassicTemplate({ design, mode, contents }: TemplateProps) {
  return (
    <ThemeContainer design={design} data-mode={mode}>
      <section className="max-w-107.5 mx-auto mb-16 overflow-hidden bg-(--bg-color) space-y-5 sm:my-12 md:my-20 sm:rounded-3xl p-2 xs:p-4 rounded-b-[calc(8px+var(--section-radius))] xs:rounded-b-[calc(16px+var(--section-radius))]">
        {Array.isArray(contents) &&
          contents
            .filter((content) => content.enabled)
            .map((content) => <ClassicSectionRenderer key={content?.id} content={content} />)}
      </section>
      <FloatingActions />
    </ThemeContainer>
  )
}
