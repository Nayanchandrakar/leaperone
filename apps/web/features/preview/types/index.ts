import type { DesignEditor } from "@app/core/types"

export type TemplateComponent = React.ComponentType<TemplateProps>

export type TemplateProps = {
  mode?: "preview"
  design: DesignEditor
}
