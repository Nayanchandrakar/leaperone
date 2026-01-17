import { BootStrap } from "@/bootstrap"
import { assetController } from "@/features/asset/modules/asset.module"
import { authController } from "@/features/auth/modules/auth.module"
import { bussinessController } from "@/features/bussiness/modules/bussiness.module"
import { invitationController } from "@/features/invitation/modules/invitation.module"
import { marketingController } from "@/features/marketing/modules/marketing.module"
import { subscriptionController } from "@/features/subscription/modules/subscription.module"
import { workspaceController } from "@/features/workspace/modules/workspace.module"

const server = new BootStrap([
  assetController,
  authController,
  bussinessController,
  invitationController,
  marketingController,
  subscriptionController,
  workspaceController,
])

server.listen()
