import type { ContentSection, DesignEditor, QrCodeEditor, Template } from "@app/types"
import { z } from "zod"
import { agreementHeading, email, id } from "../utils"
import { termsContentSchema, termsLinkSchema } from "./common"

export const agreementFormSchema = z.object({
  supportEmail: email,
  termsHeading: agreementHeading,
  policyHeading: agreementHeading,
  terms: z.discriminatedUnion("type", [termsLinkSchema, termsContentSchema]),
  policy: z.discriminatedUnion("type", [termsLinkSchema, termsContentSchema]),
  agreeToTerms: z.boolean().refine((value) => value === true, {
    message: "You must agree to our terms and conditions to continue",
  }),
})

export const saveBusinessCardSchema = z.object({
  isEdit: z.boolean().optional(),
  design: z.json() as unknown as z.ZodType<DesignEditor>,
  qrCode: z.json() as unknown as z.ZodType<QrCodeEditor>,
  content: z.json() as unknown as z.ZodType<ContentSection[]>,
  template: z.enum(["classic", "premium", "modern"] satisfies Template[]),
})

export const deleteCardSchema = z.object({ id })

export const toogleCardStatusSchema = z.object({
  id,
  status: z.enum(["active", "inactive"]),
})

export const getBusinessCardQuerySchema = z.object({
  withCard: z.coerce.boolean().optional(),
})
