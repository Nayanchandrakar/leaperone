import { handle } from "hono/vercel"
import { bootStrap } from "@/bootstrap"

const sandbox = bootStrap()

export const GET = handle(sandbox)
export const POST = handle(sandbox)
export const OPTIONS = handle(sandbox)
export const PUT = handle(sandbox)
export const PATCH = handle(sandbox)
