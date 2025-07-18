import { createTRPCRouter, publicProcedure } from "../utils/init"

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello World!"
  }),
})
