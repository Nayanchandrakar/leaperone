// import { createNEMO, type MiddlewareConfig } from "@rescale/nemo"

// import { globalMiddlewares } from "@/app/_middleware"
// import { auth } from "@/app/(auth)/_middleware"

// export const middlewares: MiddlewareConfig = {
// "/(login|sign-up|forgot-password)": auth,
// }

// export const middleware = createNEMO(middlewares, globalMiddlewares, {
//   debug: true,
//   silent: true,
//   enableTiming: true,
// })

// export const config = {
//   matcher: ["/((?!_next/|_static|_vercel|[\\w-]+\\.\\w+).*)"],
// }

export const middleware = () => {}
