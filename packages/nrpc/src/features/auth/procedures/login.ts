import { loginFormSchema } from "@myleaper/zod/client/auth"
import { baseProcedure } from "../../../utils/init"

export const login = baseProcedure
  .input(loginFormSchema)
  .mutation(async ({ c }) => {
    return c.json({ message: "mutation completed" })
  })
