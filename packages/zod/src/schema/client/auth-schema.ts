import { z } from "zod"
import { password, username } from "../utils"

export const createAccountSchema = z.object({
  username,
  name: z.string().min(1).max(30),
  email: z.email(),
  password,
})
