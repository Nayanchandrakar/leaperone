import z from "zod"
import { image, name, username } from "../utils"

export const updateProfileSchema = z
  .object({ name, username, image })
  .partial()
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field must be provided",
    path: [],
  })
