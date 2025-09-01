import { nstack } from "@app/nstack"

export const n = nstack.init()

/**
 * Type-safely injects database into all procedures
 */

// const databaseMiddleware = n.middleware(async () => {
//   return await next({})
// })

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */
export const baseProcedure = n.procedure
