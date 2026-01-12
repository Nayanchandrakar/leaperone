import { z } from "zod"
import { email, jobRole, name, password, username } from "../utils"

export const inviteMemberSchema = z.object({
  name,
  email,
  jobRole,
  username,
})

export const acceptInvitationSchema = z.object({
  token: z.string().min(1, { message: "Token is required" }),
  password,
})
