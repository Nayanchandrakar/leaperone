import { z } from "zod"
import { email, phoneNumber } from "../utils"

export const supportFormSchema = z.object({
  firstName: z.string().trim().min(1).max(30),
  lastName: z.string().trim().min(1).max(40),
  email,
  phoneNumber,
  message: z.string().trim().min(1).max(250),
})

export const contactUsFormSchema = z.object({
  firstName: z.string().trim().min(1).max(30),
  lastName: z.string().trim().min(1).max(40),
  email,
  phoneNumber,
  message: z.string().trim().min(1).max(250),
})
