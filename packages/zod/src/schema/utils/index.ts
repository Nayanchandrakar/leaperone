import { z } from "zod"

export const userNameSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .toLowerCase()
    .regex(/^[a-zA-Z]+$/, {
      message:
        "Username can only contain letters, no numbers, special characters, or symbols",
    }),
})
