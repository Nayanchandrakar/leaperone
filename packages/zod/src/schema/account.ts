import z from "zod"
import { name } from "../utils"

export const nameChangeFormSchema = z.object({
  name,
})
