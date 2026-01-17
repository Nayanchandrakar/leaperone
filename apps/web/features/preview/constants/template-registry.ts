import type { Template } from "@app/types"
import type { TemplateComponent } from "@/features/preview/types"

export const TEMPLATE_REGISTRY: Record<Template, () => Promise<{ default: TemplateComponent }>> = {
  classic: () =>
    import("@/features/preview/components/templates/classic").then((module) => ({
      default: module.default as TemplateComponent,
    })),

  premium: () =>
    import("@/features/preview/components/templates/classic").then((module) => ({
      default: module.default as TemplateComponent,
    })),
}
