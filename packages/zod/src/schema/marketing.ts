import { z } from "zod"
import { email, phoneNumber } from "../utils"

export const supportFormSchema = z.object({
  firstName: z.string().trim().min(1).max(30),
  lastName: z.string().trim().min(1).max(40),
  email,
  message: z.string().trim().min(1).max(250),
  phoneNumber: phoneNumber.or(z.literal("")).optional(),
})

export const contactUsFormSchema = z.object({
  firstName: z.string().trim().min(1).max(30),
  lastName: z.string().trim().min(1).max(40),
  email,
  message: z.string().trim().min(1).max(250),
  phoneNumber: phoneNumber.or(z.literal("")).optional(),
})
