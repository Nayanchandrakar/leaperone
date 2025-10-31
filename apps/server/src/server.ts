//  biome-ignore-all lint/correctness/noUnusedImports: vercel deployment
// @ts-expect-error
import { Hono } from "hono"
import { BootStrap } from "@/bootstrap"
import { assetController } from "@/features/asset/modules/asset.module"
import { authController } from "@/features/auth/modules/auth.module"
import { marketingController } from "@/features/marketing/modules/marketing.module"
import { subscriptionController } from "@/features/subscription/modules/subscription.module"

const server = new BootStrap([
  authController,
  assetController,
  marketingController,
  subscriptionController,
])

// server.listen()

// Exporting the instance for vercel deployment
export default server.instance
