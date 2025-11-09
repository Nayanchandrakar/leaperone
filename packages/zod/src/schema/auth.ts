import z from "zod"
import { callbackUrl, email, name, password, username } from "../utils"

export const registerFormSchema = z.object({
  name,
  email,
  password,
  username,
  callbackUrl: callbackUrl.default("/").optional(),
})

export const loginFormSchema = z.object({
  password,
  email,
  callbackUrl: callbackUrl.default("/").optional(),
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

export const resetPasswordSchema = z.object({
  token: z.cuid2(),
  newPassword: password,
})

export const setNewPasswordSchema = z
  .object({
    newPassword: password,
    confirmPassword: password,
    token: z.cuid2(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords does not match",
  })

export const restrictUserSchema = z.object({
  userId: z.cuid2(),
})
