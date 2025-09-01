import { registerSchema } from "@app/zod/client/auth"
import { baseProcedure } from "../../../utils/init"

export const register = baseProcedure
  .input(registerSchema)
  .mutation(async ({ c }) => {
    return c.json({ message: "mutation completed" })
  })
