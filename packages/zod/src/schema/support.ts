import z from "zod"
import { email } from "../utils"

export const supportFormSchema = z.object({
  firstName: z.string().min(1).max(30),
  lastName: z.string().min(1).max(40),
  email,
  phoneNumber: z.e164({ error: "Invalid phone number" }).optional(),
  message: z.string().min(1).max(250),
})
