import { z } from "zod"
import {
  backgroundSchema,
  cardImageSchema,
  cardSettingsSchema,
  colorsSchema,
  sectionBackgroundSchema,
} from "./common"

export const designEditorSchema = z.object({
  background: z.array(backgroundSchema).min(30).max(50),
  colors: colorsSchema,
  sectionBackground: sectionBackgroundSchema,
  cardImage: cardImageSchema,
  settings: cardSettingsSchema,
})
