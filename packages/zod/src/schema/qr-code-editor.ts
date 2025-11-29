import z from "zod"
import { gradientFillSchema, singleColorFillSchema } from "./common"

export const qrCodeEditorSchema = z.object({
  data: z.url(),
  logo: z.url().optional(),
  bodyShape: z.enum(["square", "circle"]),
  cornerStyle: z.enum(["square", "dot", "extra-rounded"]),
  patternStyle: z.enum(["square", "dots", "classy-rounded"]),
  fill: z.discriminatedUnion("type", [singleColorFillSchema, gradientFillSchema]),
})
