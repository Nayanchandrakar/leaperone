import type { ContentSection, DesignEditor } from "@app/core/types"

export type TemplateComponent = React.ComponentType<TemplateProps>

export type TemplateProps = {
  mode?: "preview"
  design: DesignEditor
  content: ContentSection[]
}
