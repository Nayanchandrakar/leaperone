import { z } from "zod"
import { password, username } from "../utils"

export const registerSchema = z.object({
  username,
  name: z.string().min(1, { error: "Name is required" }).max(30),
  email: z.email(),
  password,
  callbackUrl: z.string().optional(),
})

export const loginFormSchema = z.object({
  password,
  email: z.email(),
  callbackUrl: z.string().optional(),
})

export const forgotPasswordFormSchema = z.object({
  email: z.email(),
})
