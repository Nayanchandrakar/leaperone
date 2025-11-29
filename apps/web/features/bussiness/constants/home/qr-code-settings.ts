import type { QrCodeEditorSchema } from "@app/zod/types"

export const DEFAULT_QR_CODE_SETTINGS: QrCodeEditorSchema = {
  data: "https://www.google.com",
  logo: "https://www.google.com",
  bodyShape: "square",
  cornerStyle: "square",
  patternStyle: "square",
  fill: {
    type: "single",
    color: "#000000",
  },
}
