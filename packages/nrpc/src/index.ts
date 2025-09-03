import { Hono } from "hono"
import authRouter from "./features/auth/modules/auth.routes"

const app = new Hono().basePath("/api")
const routes = app.route("/auth", authRouter)

export type AppRouter = typeof routes
export default app
