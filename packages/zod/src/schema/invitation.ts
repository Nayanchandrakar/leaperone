import { z } from "zod"
import { email, jobRole, name, password, username } from "../utils"

export const inviteMemberSchema = z.object({
  name,
  email,
  jobRole,
  username,
})

export const acceptInvitationSchema = z
  .object({
    password,
    token: z.cuid2(),
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    error: "Passwords does not match",
  })
