import { z } from "zod"
import { password, username } from "../utils"

export const signupSchema = z.object({
  username,
  name: z.string().min(1, { error: "Name is required" }).max(30),
  email: z.email(),
  password,
})

export const loginFormSchema = z.object({
  email: z.email(),
  password,
})
