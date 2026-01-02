import type { ContentSection, FloatingButtonSection } from "@app/core/types"

/**
 * Utility function to separate content sections into main sections and floating button content.
 * @param contents Array of ContentSection items.
 * @returns An object with mainSections and floatingButtonContent.
 */
export function separateSections(contents: ContentSection[]) {
  const sections = Array.isArray(contents) ? contents.filter((content) => content.enabled) : []

  let floatingButtonContent: FloatingButtonSection | undefined
  const mainSections: Exclude<ContentSection, FloatingButtonSection>[] = []

  for (const content of sections) {
    if (content.type === "floating-button") {
      floatingButtonContent = content
    } else {
      mainSections.push(content)
    }
  }

  return { mainSections, floatingButtonContent }
}
