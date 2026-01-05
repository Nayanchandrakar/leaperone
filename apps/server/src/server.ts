import { BootStrap } from "@/bootstrap"
import { assetController } from "@/features/asset/modules/asset.module"
import { authController } from "@/features/auth/modules/auth.module"
import { invitationController } from "@/features/invitation/modules/invitation.module"
import { marketingController } from "@/features/marketing/modules/marketing.module"
import { subscriptionController } from "@/features/subscription/modules/subscription.module"

const server = new BootStrap([
  authController,
  assetController,
  invitationController,
  marketingController,
  subscriptionController,
])

server.listen()
