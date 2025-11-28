import { z } from "zod"
import {
  backgroundSchema,
  cardImageSchema,
  cardSettingsSchema,
  colorSchema,
  sectionBackgroundSchema,
} from "./common"

export const designEditorSchema = z.object({
  // background: z.array(backgroundSchema).min(30).max(50),
  background: z.array(backgroundSchema).min(3).max(50),
  color: colorSchema,
  sectionBackground: sectionBackgroundSchema,
  cardImage: cardImageSchema,
  settings: cardSettingsSchema,
})
