import type { ContentSection, FloatingButtonSection } from "@app/types"

/**
 * Utility function to separate content sections into main sections and floating button content.
 * @param contents Array of ContentSection items.
 * @returns An object with mainSections and floatingButton.
 */
export function separateSections(contents: ContentSection[]) {
  const sections = Array.isArray(contents) ? contents.filter((content) => content.enabled) : []

  let floatingButton: FloatingButtonSection | undefined
  const mainSections: Exclude<ContentSection, FloatingButtonSection>[] = []

  for (const content of sections) {
    if (content.type === "floating-button") {
      floatingButton = content
    } else {
      mainSections.push(content)
    }
  }

  return { mainSections, floatingButton }
}
