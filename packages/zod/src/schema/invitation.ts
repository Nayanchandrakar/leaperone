import { z } from "zod"
import { email, id, jobRole, name, password, username } from "../utils"

export const inviteMemberSchema = z.object({
  name,
  email,
  jobRole,
  username,
})

export const passwordSetupSchema = z
  .object({
    password,
    token: id,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords does not match",
  })

export const impersonateSchema = z.object({ memberId: id })
