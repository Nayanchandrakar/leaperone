import type { UpdateMetaOptions } from "@tanstack/react-form"

export const IGNORE_FORM_VALIDATION: UpdateMetaOptions = {
  dontValidate: true,
  dontUpdateMeta: true,
  dontRunListeners: true,
}
