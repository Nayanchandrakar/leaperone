import { z } from "zod"
import { username } from "../utils"

export const userNameSchema = z.object({
  username,
})
