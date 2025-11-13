import { z } from "zod"
import { agreementHeading, email, termsContentSchema, termsLinkSchema } from "../utils"

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
