import type { TemplateKey } from "@app/core/types"
import type { TemplateComponent } from "@/features/preview/types"

export const TEMPLATE_REGISTRY: Record<TemplateKey, () => Promise<{ default: TemplateComponent }>> =
  {
    classic: () =>
      import("@/features/preview/components/templates/classic").then((module) => ({
        default: module.default as TemplateComponent,
      })),

    premium: () =>
      import("@/features/preview/components/templates/classic").then((module) => ({
        default: module.default as TemplateComponent,
      })),
  }
