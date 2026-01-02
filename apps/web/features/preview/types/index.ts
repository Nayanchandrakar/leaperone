import type { ContentSection, DesignEditor, FloatingButtonSection } from "@app/core/types"

export type TemplateComponent = React.ComponentType<TemplateProps>
export type ContentSections = Exclude<ContentSection, FloatingButtonSection>

export type TemplateProps = {
  mode?: "preview"
  design: DesignEditor
  contents: ContentSections[]
  floating: FloatingButtonSection | undefined
}
