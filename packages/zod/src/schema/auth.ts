import z from "zod"
import { callbackUrl, email, password, username } from "../utils"

export const registerFormSchema = z.object({
  email,
  password,
  username,
  callbackUrl: callbackUrl.default("/").optional(),
  name: z.string().min(1, { error: "Name is required" }).max(30),
})

export const loginFormSchema = z.object({
  password,
  email,
  callbackUrl: callbackUrl.default("/").optional(),
})

export const forgotPasswordFormSchema = z.object({
  email,
})

export const userNameSchema = z.object({
  username,
})

export const verifyEmailSchema = z.object({
  token: z.jwt().min(1),
  callbackUrl,
})

export const emailSchema = z.object({
  email,
})

export const passwordResetSchema = z.object({
  email,
  redirectTo: callbackUrl.optional(),
})
