import { handle } from "hono/vercel"
import { bootStrap } from "@/bootstrap"

const sandbox = bootStrap()

export const GET = handle(sandbox)
export const POST = handle(sandbox)
