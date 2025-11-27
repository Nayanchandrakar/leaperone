import type { ColorSchema, DesignEditorSchema } from "@app/zod/types"
import { BACKGROUND_IMAGES } from "@/features/bussiness/constants/home/background-images"
import { CARD_COLORS } from "@/features/bussiness/constants/home/card-colors"

export const DEFAULT_DESIGN_SETTINGS: DesignEditorSchema = {
  background: BACKGROUND_IMAGES,
  color: CARD_COLORS[0] as ColorSchema,
  sectionBackground: {
    enabled: true,
    color: "#FFFFFF",
    borderRadius: 34,
  },
  cardImage: {
    url: "https://images.pexels.com/photos/7004697/pexels-photo-7004697.jpeg",
  },
  settings: {
    scanReportEmail: {
      enabled: true,
      frequency: "weekly",
      emails: ["test@test.com", "test2@test.com"],
    },
    branding: true,
  },
}
