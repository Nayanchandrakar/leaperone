import z from "zod"
import { callbackUrl, email, id, name, password, username } from "../utils"

export const registerFormSchema = z.object({
  name,
  email,
  password,
  username,
  callbackUrl,
})

export const loginFormSchema = z.object({
  email,
  password,
  callbackUrl,
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

export const updatePasswordSchema = z
  .object({
    newPassword: password,
    currentPassword: password,
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ["newPassword"],
    message: "New password must be different from current password",
  })

export const setNewPasswordSchema = z
  .object({
    token: z.cuid2(),
    newPassword: password,
    confirmPassword: password,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords does not match",
  })

export const restrictUserSchema = z.object({
  memberId: id,
  restrict: z.boolean(),
})

export const getPermissionSchema = z.object({
  permission: z.string(),
})
