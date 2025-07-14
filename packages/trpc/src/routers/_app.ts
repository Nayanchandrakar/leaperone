import { createTRPCRouter, publicProcedure } from "@leapercrm/trpc/utils/init"

export const appRouter = createTRPCRouter({
  hello: publicProcedure.query(() => {
    return "Hello World!"
  }),
})
